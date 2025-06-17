
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CreateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMeetingDialog = ({ open, onOpenChange }: CreateMeetingDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    location: '',
    attendees: '',
    agenda: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!meetingData.title.trim()) {
      newErrors.title = 'Meeting title is required';
    }
    if (!meetingData.date) {
      newErrors.date = 'Date is required';
    }
    if (!meetingData.time) {
      newErrors.time = 'Time is required';
    }
    if (!meetingData.duration || parseInt(meetingData.duration) < 1) {
      newErrors.duration = 'Duration must be at least 1 minute';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Creating meeting:', meetingData);
      
      toast({
        title: "Meeting Created",
        description: `"${meetingData.title}" has been scheduled successfully.`,
      });
      
      // Reset form
      setMeetingData({
        title: '',
        date: '',
        time: '',
        duration: '30',
        location: '',
        attendees: '',
        agenda: '',
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create meeting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setMeetingData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">Create New Meeting</DialogTitle>
          <DialogDescription className="text-slate-600">
            Schedule a new meeting and set up all the necessary details for your team collaboration.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Meeting Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Meeting Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={meetingData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter meeting title"
                  className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="flex items-center text-sm font-medium">
                    <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={meetingData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={`mt-1 ${errors.date ? 'border-red-500' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                
                <div>
                  <Label htmlFor="time" className="flex items-center text-sm font-medium">
                    <Clock className="w-4 h-4 mr-1 text-blue-600" />
                    Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={meetingData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className={`mt-1 ${errors.time ? 'border-red-500' : ''}`}
                  />
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>
                
                <div>
                  <Label htmlFor="duration" className="text-sm font-medium">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="480"
                    value={meetingData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="30"
                    className={`mt-1 ${errors.duration ? 'border-red-500' : ''}`}
                  />
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Participants & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location" className="flex items-center text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-1 text-green-600" />
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
                <Label htmlFor="attendees" className="text-sm font-medium">Attendees</Label>
                <Input
                  id="attendees"
                  value={meetingData.attendees}
                  onChange={(e) => handleChange('attendees', e.target.value)}
                  placeholder="Enter email addresses separated by commas"
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Separate multiple email addresses with commas
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meeting Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={meetingData.agenda}
                onChange={(e) => handleChange('agenda', e.target.value)}
                placeholder="Enter meeting agenda items, topics to discuss, and any preparation notes..."
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Meeting'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
