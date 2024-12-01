import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTIcon} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import { useUserCpanelDiskUsage } from '../../../../app/modules/services/core/Services'
import { Link } from 'react-router-dom'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
  username: string
}

const UsedDiskSpace: React.FC<Props> = ({className, chartColor, chartHeight, username}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const diskUsage = useUserCpanelDiskUsage(username) as { blocks_used?: number, blocks_limit?: number};
  var usedDiskSpace = -1;
  if (diskUsage?.blocks_limit != null) {
    usedDiskSpace = (((diskUsage?.blocks_used || 0)) / (diskUsage?.blocks_limit || 0)) * 100;
  }
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight, parseFloat(usedDiskSpace.toFixed(0))))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode, usedDiskSpace])
  return (
    <div className={`card ${className}`}>
      {/* begin::Beader */}
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Stocare</span>
          <span className='text-muted fw-semibold fs-7'>Spațiul de stocare utilizat</span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body d-flex flex-column'>
        <div className='flex-grow-1'>
          <div ref={chartRef} className='mixed-widget-4-chart'></div>
        </div>

        <div className=''>
          <div className='text-center'>
            <span className='me-3 fs-6'>{diskUsage?.blocks_used} / { !diskUsage?.blocks_limit ? 
            (<span>Nelimitat</span>) : diskUsage?.blocks_limit} KB</span>
          </div>
          {usedDiskSpace === -1 ? (
              <p className='text-center fs-6 pb-5 pt-5 '>
              <span className='badge badge-light-success fs-8'>Notă:</span>&nbsp; Spațiul de stocare este nelimitat !
            </p>
          ) : (
            <div>
              {parseFloat(usedDiskSpace.toFixed(0)) > 90 ? (
                <p className='text-center fs-6 pb-5 pt-5 '>
                  <span className='badge badge-light-danger fs-8'>Notă:</span>&nbsp; Spațiul de stocare necesită atenția dumneavoastră !
                  <br />
                  Pentru a suplimenta spațiul de stocare, <br />
                  contactați departamentul de suport.
                </p>
              ) : (
                <p className='text-center fs-6 pb-5 pt-5 '>
                  <span className='badge badge-light-success fs-8'>Notă:</span>&nbsp; Spațiul de stocare este suficient !
                </p>
              )}
              <Link to='../extra-options/' className={`btn btn-${chartColor} w-100 py-3`}>
                <span>Suplimentare stocare</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (chartColor: string, chartHeight: string, chartPercentage: number): ApexOptions => {
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-' + chartColor + '-light')
  const labelColor = getCSSVariableValue('--bs-gray-700')
  return {
    series: [chartPercentage],
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '65%',
        },
        dataLabels: {
          name: {
            show: false,
            fontWeight: '700',
          },
          value: {
            color: labelColor,
            fontSize: '30px',
            fontWeight: '700',
            offsetY: 12,
            show: true,
            formatter: function (val) {
              if (chartPercentage === -1){
                return 'N/A'
              }
              return val + '%'
            },
          },
        },
        track: {
          background: lightColor,
          strokeWidth: '100%',
        },
      },
    },
    colors: [baseColor],
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  }
}

export {UsedDiskSpace}
