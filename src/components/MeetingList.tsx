
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, MoreVertical, Play, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MeetingList = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingMeetings = [
    {
      id: 1,
      title: 'Weekly Team Standup',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: '30 min',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      status: 'upcoming',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Project Review Meeting',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '60 min',
      location: 'Virtual - Zoom',
      attendees: ['Sarah Wilson', 'Tom Brown', 'Lisa Chen'],
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: '2024-01-21',
      time: '11:00 AM',
      duration: '45 min',
      location: 'Conference Room B',
      attendees: ['Alex Turner', 'Emma Davis', 'Ryan Lee'],
      status: 'upcoming',
      priority: 'high'
    }
  ];

  const pastMeetings = [
    {
      id: 4,
      title: 'Budget Planning Session',
      date: '2024-01-18',
      time: '3:00 PM',
      duration: '90 min',
      location: 'Conference Room C',
      attendees: ['Maria Garcia', 'David Kim', 'Sophie Taylor'],
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Product Roadmap Discussion',
      date: '2024-01-17',
      time: '1:00 PM',
      duration: '60 min',
      location: 'Virtual - Teams',
      attendees: ['Chris Anderson', 'Amy White', 'Ben Martinez'],
      status: 'completed',
      priority: 'high'
    }
  ];

  const MeetingCard = ({ meeting, showActions = true }) => (
    <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-slate-800 mb-2">{meeting.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{meeting.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{meeting.time} ({meeting.duration})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={meeting.priority === 'high' ? 'destructive' : 'secondary'}
              className="capitalize"
            >
              {meeting.priority}
            </Badge>
            {showActions && (
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{meeting.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{meeting.attendees.length} attendees</span>
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2">
              {meeting.status === 'upcoming' ? (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-1" />
                  View Minutes
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Upcoming Meetings</h2>
            <Badge variant="secondary">{upcomingMeetings.length} meetings</Badge>
          </div>
          
          {upcomingMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Past Meetings</h2>
            <Badge variant="secondary">{pastMeetings.length} meetings</Badge>
          </div>
          
          {pastMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} showActions={false} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
