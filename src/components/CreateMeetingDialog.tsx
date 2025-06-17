
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMeetingDialog = ({ open, onOpenChange }: CreateMeetingDialogProps) => {
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    location: '',
    attendees: '',
    agenda: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating meeting:', meetingData);
    // Here you would save to Supabase
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setMeetingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">Create New Meeting</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="w-5 h-5 mr-2" />
                Meeting Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  value={meetingData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter meeting title"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={meetingData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time" className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={meetingData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={meetingData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="30"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2" />
                Participants & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={meetingData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Conference Room A or Zoom link"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="attendees">Attendees</Label>
                <Input
                  id="attendees"
                  value={meetingData.attendees}
                  onChange={(e) => handleChange('attendees', e.target.value)}
                  placeholder="Enter email addresses separated by commas"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={meetingData.agenda}
                onChange={(e) => handleChange('agenda', e.target.value)}
                placeholder="Enter meeting agenda items..."
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Create Meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
