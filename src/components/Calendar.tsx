import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Video, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  type: 'mentoring' | 'webinar' | 'testing' | 'study' | 'meeting';
  startTime: Date;
  endTime: Date;
  attendees: string[];
  maxAttendees?: number;
  meetingLink?: string;
  createdBy: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const events: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Unity Mentoring Session',
      description: 'One-on-one mentoring for Unity game development basics',
      type: 'mentoring',
      startTime: new Date(2024, 2, 26, 14, 0),
      endTime: new Date(2024, 2, 26, 15, 0),
      attendees: ['user1'],
      maxAttendees: 1,
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      createdBy: 'mentor1',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Advanced Shader Programming',
      description: 'Learn advanced shader techniques for realistic rendering',
      type: 'webinar',
      startTime: new Date(2024, 2, 27, 16, 0),
      endTime: new Date(2024, 2, 27, 17, 30),
      attendees: ['user1', 'user2', 'user3'],
      maxAttendees: 50,
      meetingLink: 'https://zoom.us/j/1234567890',
      createdBy: 'instructor1',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Game Testing Session: RPG Beta',
      description: 'Structured testing session for new RPG game',
      type: 'testing',
      startTime: new Date(2024, 2, 28, 10, 0),
      endTime: new Date(2024, 2, 28, 12, 0),
      attendees: ['user1'],
      maxAttendees: 10,
      createdBy: 'studio1',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'JavaScript Study Group',
      description: 'Weekly study session for JavaScript fundamentals',
      type: 'study',
      startTime: new Date(2024, 2, 29, 18, 0),
      endTime: new Date(2024, 2, 29, 19, 30),
      attendees: ['user1', 'user2'],
      maxAttendees: 15,
      meetingLink: 'https://discord.gg/studygroup',
      createdBy: 'user1',
      status: 'scheduled'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'mentoring': return 'bg-blue-600';
      case 'webinar': return 'bg-purple-600';
      case 'testing': return 'bg-green-600';
      case 'study': return 'bg-orange-600';
      case 'meeting': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'mentoring': return '👨‍🏫';
      case 'webinar': return '📺';
      case 'testing': return '🎮';
      case 'study': return '📚';
      case 'meeting': return '👥';
      default: return '📅';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 bg-gray-800/50 border border-gray-700"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(event => 
        event.startTime.toDateString() === date.toDateString()
      );

      days.push(
        <div
          key={day}
          className={`h-32 bg-gray-800 border border-gray-700 p-2 cursor-pointer hover:bg-gray-700 transition-colors ${
            selectedDate?.toDateString() === date.toDateString() ? 'bg-purple-600/20 border-purple-500' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="font-semibold text-white mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`text-xs text-white px-2 py-1 rounded ${getEventTypeColor(event.type)} truncate`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-400">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const todayEvents = events.filter(event => 
    event.startTime.toDateString() === new Date().toDateString()
  );

  const upcomingEvents = events
    .filter(event => event.startTime > new Date())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendar & Schedule</h1>
          <p className="text-gray-400 mt-1">Manage your learning schedule and events</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Schedule Event</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today's Events</p>
              <p className="text-2xl font-bold">{todayEvents.length}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">This Week</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Clock className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Mentoring Hours</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Users className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Study Sessions</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <Video className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-400" />
                </button>
                <h2 className="text-xl font-bold text-white">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
                {['month', 'week', 'day'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      viewMode === mode
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            {viewMode === 'month' && (
              <>
                <div className="grid grid-cols-7 gap-0 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-2 text-center text-gray-400 font-semibold text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0">
                  {renderCalendarDays()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Today's Schedule</h3>
            {todayEvents.length === 0 ? (
              <p className="text-gray-400 text-sm">No events scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div key={event.id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getEventTypeIcon(event.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">{event.title}</h4>
                        <p className="text-gray-400 text-xs mb-2">{event.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>
                            {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                            {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {event.meetingLink && (
                          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                            Join Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="text-lg">{getEventTypeIcon(event.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">{event.title}</h4>
                    <p className="text-gray-400 text-xs">
                      {event.startTime.toLocaleDateString()} at{' '}
                      {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Types Legend */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Event Types</h3>
            <div className="space-y-2">
              {[
                { type: 'mentoring', label: 'Mentoring Sessions' },
                { type: 'webinar', label: 'Live Webinars' },
                { type: 'testing', label: 'Game Testing' },
                { type: 'study', label: 'Study Groups' },
                { type: 'meeting', label: 'Meetings' }
              ].map((item) => (
                <div key={item.type} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(item.type)}`}></div>
                  <span className="text-gray-300 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-6">Schedule New Event</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Event Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                  <option>Mentoring Session</option>
                  <option>Webinar</option>
                  <option>Game Testing</option>
                  <option>Study Group</option>
                  <option>Meeting</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Start Time</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">End Time</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Event description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;