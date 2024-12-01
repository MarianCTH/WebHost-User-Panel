import {useEffect, useRef, FC} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import {useAuth, UserModel} from '../../../../app/modules/auth'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

const ProfileWidget: FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const { currentUser } = useAuth();

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart1 = new ApexCharts(chartRef.current, chart1Options(chartColor, chartHeight))
    if (chart1) {
      chart1.render()
    }

    return chart1
  }

  useEffect(() => {
    const chart1 = refreshChart()

    return () => {
      if (chart1) {
        chart1.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  const calculateCompletionPercentage = () => {
    if (!currentUser) return '0';

    const userModelFields: Array<keyof UserModel> = Object.keys(currentUser) as Array<keyof UserModel>;
    const totalFields = userModelFields.length;
    let filledFields = 0;

    userModelFields.forEach((field) => {
      if (currentUser[field] !== undefined && currentUser[field] !== '') {
        filledFields++;
      }
    });

    const percentage = (filledFields / totalFields) * 100;
    return percentage.toFixed(2);
};

  const ProfileCompletionBar = () => {
    return (
      <div className='d-flex flex-wrap flex-stack'>
        <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
          <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
            <span className='fw-bold fs-6 text-gray-500'>Completarea Profilului</span>
            <span className='fw-bolder fs-6'>{calculateCompletionPercentage()}%</span>
          </div>
          <div className='h-5px mx-3 w-100 bg-light mb-3'>
            <div
              className='bg-success rounded h-5px'
              role='progressbar'
              style={{ width: `${calculateCompletionPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`card ${className}`}>
      {/* begin::Beader */}
      <div className='card-header border-0 py-5'>
      <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src={toAbsoluteUrl('media/avatars/' + currentUser?.pic)} alt='Metornic' />
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {currentUser?.last_name} {currentUser?.first_name}
                      </a>
                      <a href='#'>
                        <KTIcon iconName='verify' className='fs-1 text-primary' />
                      </a>
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                      >
                        <KTIcon iconName='geolocation' className='fs-4 me-1' />
                        {currentUser?.country}
                      </a>
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'
                      >
                        <KTIcon iconName='sms' className='fs-4 me-1' />
                        {currentUser?.email}
                      </a>
                    </div>
                  </div>
                </div>
                <ProfileCompletionBar />
              </div>
      </div>
      {/* end::Header */}
    </div>
  )
}

const chart1Options = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800')
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor) as string
  const lightColor = getCSSVariableValue('--bs-' + chartColor + '-light')

  return {
    series: [
      {
        name: 'Net Profit',
        data: [30, 30, 60, 25, 25, 40],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    // fill1: {
    //   type: 'gradient',
    //   opacity: 1,
    //   gradient: {
    //     type: 'vertical',
    //     shadeIntensity: 0.5,
    //     gradientToColors: undefined,
    //     inverseColors: true,
    //     opacityFrom: 1,
    //     opacityTo: 0.375,
    //     stops: [25, 50, 100],
    //     colorStops: [],
    //   },
    // },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 65,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {ProfileWidget}
