
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Clock, Users, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export const MeetingRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [actionItems, setActionItems] = useState([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    // Save meeting data
    console.log('Meeting ended. Duration:', formatTime(elapsedTime));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timer and Controls */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Meeting Timer
              </CardTitle>
              <Badge variant={isRecording ? 'destructive' : 'secondary'}>
                {isRecording ? 'Recording' : 'Stopped'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-mono font-bold text-slate-800">
                {formatTime(elapsedTime)}
              </div>
              
              <div className="flex justify-center space-x-3">
                {!isRecording ? (
                  <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Meeting
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handlePause} 
                      variant="outline"
                      className={isPaused ? 'bg-orange-50 border-orange-200' : ''}
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button onClick={handleStop} variant="destructive">
                      <Square className="w-4 h-4 mr-2" />
                      End Meeting
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Meeting Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes during the meeting..."
              rows={10}
              className="resize-none text-base leading-relaxed"
            />
            
            <div className="flex justify-end mt-4">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Notes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Users className="w-6 h-6" />
                <span>Add Attendee</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Clock className="w-6 h-6" />
                <span>Add Action Item</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Save className="w-6 h-6" />
                <span>Save Progress</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
