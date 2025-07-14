import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import StaffSidebar from '../../components/common/StaffSidebar'
import WorkRequestCard from '../../components/dashboard/WorkRequestCard'
import TimeTrackerCard from '../../components/dashboard/Timetrackercard'
import Header from '../../../components/common/Header'
import AttendanceWeeklyTable from '../../components/Attendence and leave/AttendanceWeeklyTable'

const EmployeeAttendancePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly')
  const { id } = useParams<{ id: string }>()

  const attendanceDetailData = [
    { day: 'Monday',    date: '18-05-2025', checkIn: '8:35',  checkOut: '--',    hours: '8',  status: 'Checked In'     },
    { day: 'Tuesday',   date: '19-05-2025', checkIn: '8:35',  checkOut: '18:35', hours: '7',  status: 'Completed'      },
    { day: 'Wednesday', date: '20-05-2025', checkIn: '--',    checkOut: '--',    hours: '2',  status: 'Absent'         },
    { day: 'Thursday',  date: '21-05-2025', checkIn: '--',    checkOut: '--',    hours: '6',  status: 'Approved Off'   },
    { day: 'Friday',    date: '22-05-2025', checkIn: '8:35',  checkOut: '--',    hours: '12', status: 'Action Required'},
    { day: 'Saturday',  date: '23-05-2025', checkIn: '8:35',  checkOut: '9:45',  hours: '10', status: 'Incomplete'     },
    { day: 'Sunday',    date: '24-05-2025', checkIn: '--',    checkOut: '--',    hours: '9',  status: 'Off Day'        },
  ]

  const getColorBorder = (status: string) => {
    switch (status) {
      case 'Checked In':
      case 'Completed':      return 'border-green-500'
      case 'Absent':         return 'border-red-500'
      case 'Approved Off':   return 'border-blue-500'
      case 'Action Required':return 'border-orange-400'
      case 'Incomplete':     return 'border-gray-400'
      default:               return 'border-gray-300'
    }
  }

  const getColorBg = (status: string) => {
    switch (status) {
      case 'Checked In':
      case 'Completed':      return 'bg-green-500'
      case 'Absent':         return 'bg-red-500'
      case 'Approved Off':   return 'bg-blue-500'
      case 'Action Required':return 'bg-orange-400'
      case 'Incomplete':     return 'bg-gray-400'
      default:               return 'bg-gray-300'
    }
  }

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col w-full">
        <Header />

        <div className="p-6 space-y-6">
          {/* Top Cards */}
          <div className="flex gap-4 ">
         <div className="w-1/2">
    <TimeTrackerCard />
  </div>
  <div className="w-1/2">
    <WorkRequestCard />
  </div>
          </div>

          {/* Attendance Panel */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow p-6">
            {/* Toggle + Legend */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Attendance</h2>

              <div className="flex items-center gap-6 bg-gray-100 px-3 py-2 rounded-full">
                <div className="flex rounded-full bg-white shadow-inner">
                  <button
                    onClick={() => setViewMode('weekly')}
                    className={`px-4 py-1 rounded-l-full text-sm font-medium transition ${
                      viewMode === 'weekly' ? 'bg-gray-300 text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setViewMode('monthly')}
                    className={`px-4 py-1 rounded-r-full text-sm font-medium transition ${
                      viewMode === 'monthly' ? 'bg-gray-300 text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                {/* Legend */}
                <div className="hidden md:flex items-center space-x-4">
                  {[
                    ['bg-green-500', 'Checked In'],
                    ['bg-red-500', 'Absent'],
                    ['bg-orange-400', 'Regularization'],
                    ['bg-blue-500', 'Approved Off'],
                  ].map(([color, label], idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <span className={`h-3 w-3 rounded-full ${color}`}></span>
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance View */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              {viewMode === 'weekly' ? (
                <AttendanceWeeklyTable />
              ) : (
                <>
                  <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-3">
                    {Array.from({ length: 31 }).map((_, idx) => {
                      const dayData = attendanceDetailData[idx % attendanceDetailData.length]
                      return (
                        <div
                          key={idx}
                          className={`rounded-xl border ${getColorBorder(dayData.status)} shadow-sm hover:shadow-md flex flex-col justify-between h-24`}
                        >
                          <div className="flex justify-between px-2 pt-2 text-sm font-medium text-gray-800">
                            <span>{idx + 1}</span>
                            <span>{dayData.checkIn}-{dayData.checkOut}</span>
                          </div>
                          <div className={`text-[13px] rounded-b-xl font-semibold text-white text-center py-1 ${getColorBg(dayData.status)}`}>
                            {dayData.status}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeAttendancePage
