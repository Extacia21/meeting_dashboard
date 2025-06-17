
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, MoreVertical, Play, FileText, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export const MeetingList = () => {
  const { toast } = useToast();
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

  const handleStartMeeting = (meetingTitle: string) => {
    toast({
      title: "Starting Meeting",
      description: `"${meetingTitle}" session is beginning. Redirecting to meeting recorder...`,
    });
    // Here you would navigate to the meeting recorder
  };

  const handleEditMeeting = (meetingTitle: string) => {
    toast({
      title: "Edit Meeting",
      description: `Opening "${meetingTitle}" for editing...`,
    });
  };

  const handleDeleteMeeting = (meetingTitle: string) => {
    toast({
      title: "Meeting Deleted",
      description: `"${meetingTitle}" has been removed from your schedule.`,
      variant: "destructive"
    });
  };

  const handleViewMinutes = (meetingTitle: string) => {
    toast({
      title: "Loading Minutes",
      description: `Opening meeting minutes for "${meetingTitle}"...`,
    });
  };

  const MeetingCard = ({ meeting, showActions = true }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-slate-800 mb-2 line-clamp-2">{meeting.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{new Date(meeting.date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-500" />
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleEditMeeting(meeting.title)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Meeting
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDeleteMeeting(meeting.title)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Meeting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="truncate max-w-32">{meeting.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{meeting.attendees.length} attendees</span>
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2">
              {meeting.status === 'upcoming' ? (
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleStartMeeting(meeting.title)}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewMinutes(meeting.title)}
                  className="hover:bg-blue-50 hover:border-blue-300"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  View Minutes
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Attendees preview */}
        {meeting.attendees.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-medium">Attendees:</span>
              <div className="flex flex-wrap gap-1">
                {meeting.attendees.slice(0, 3).map((attendee, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                    {attendee}
                  </Badge>
                ))}
                {meeting.attendees.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{meeting.attendees.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md bg-slate-100">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-white">
            Past Meetings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Upcoming Meetings</h2>
            <Badge variant="secondary" className="px-3 py-1">
              {upcomingMeetings.length} meetings
            </Badge>
          </div>
          
          {upcomingMeetings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No upcoming meetings scheduled</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Past Meetings</h2>
            <Badge variant="secondary" className="px-3 py-1">
              {pastMeetings.length} meetings
            </Badge>
          </div>
          
          {pastMeetings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No past meetings found</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} showActions={false} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
