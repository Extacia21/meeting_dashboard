
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Clock, Users, Save, Plus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  deadline: string;
  completed: boolean;
}

export const MeetingRecorder = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [newActionItem, setNewActionItem] = useState({
    task: '',
    assignee: '',
    deadline: ''
  });
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Auto-save notes every 30 seconds
  useEffect(() => {
    if (notes.length > 0 && isRecording) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 30000);
      return () => clearTimeout(autoSaveTimer);
    }
  }, [notes, isRecording]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    toast({
      title: "Meeting Started",
      description: "Recording has begun. All notes will be auto-saved.",
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Recording Resumed" : "Recording Paused",
      description: isPaused ? "Timer is now running" : "Timer has been paused",
    });
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    handleSaveNotes();
    toast({
      title: "Meeting Ended",
      description: `Meeting duration: ${formatTime(elapsedTime)}. All data has been saved.`,
    });
  };

  const handleAutoSave = async () => {
    setAutoSaveStatus('saving');
    try {
      // Simulate auto-save
      await new Promise(resolve => setTimeout(resolve, 500));
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    } catch (error) {
      setAutoSaveStatus('idle');
    }
  };

  const handleSaveNotes = async () => {
    try {
      // Simulate saving to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Notes Saved",
        description: "Meeting notes and action items have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save notes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addActionItem = () => {
    if (!newActionItem.task.trim()) {
      toast({
        title: "Invalid Action Item",
        description: "Please enter a task description.",
        variant: "destructive"
      });
      return;
    }

    const actionItem: ActionItem = {
      id: Date.now().toString(),
      task: newActionItem.task,
      assignee: newActionItem.assignee || 'Unassigned',
      deadline: newActionItem.deadline,
      completed: false
    };

    setActionItems(prev => [...prev, actionItem]);
    setNewActionItem({ task: '', assignee: '', deadline: '' });
    toast({
      title: "Action Item Added",
      description: "New action item has been added to the list.",
    });
  };

  const toggleActionItem = (id: string) => {
    setActionItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Meeting Recorder</h1>
          <p className="text-slate-600">Record your meeting with live notes and action item tracking</p>
        </div>

        {/* Timer and Controls */}
        <Card className="border-l-4 border-l-green-500 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-xl">
                <Clock className="w-6 h-6 mr-2 text-green-600" />
                Meeting Timer
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant={isRecording ? 'destructive' : 'secondary'} className="px-3 py-1">
                  {isRecording ? (isPaused ? 'Paused' : 'Recording') : 'Stopped'}
                </Badge>
                {autoSaveStatus === 'saved' && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Auto-saved
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-5xl font-mono font-bold text-slate-800 tracking-wider">
                {formatTime(elapsedTime)}
              </div>
              
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <Button onClick={handleStart} size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                    <Play className="w-5 h-5 mr-2" />
                    Start Meeting
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handlePause} 
                      size="lg"
                      variant="outline"
                      className={`px-6 ${isPaused ? 'bg-orange-50 border-orange-200 hover:bg-orange-100' : 'hover:bg-slate-50'}`}
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button onClick={handleStop} size="lg" variant="destructive" className="px-6">
                      <Square className="w-5 h-5 mr-2" />
                      End Meeting
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Meeting Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during the meeting... Notes are auto-saved every 30 seconds when recording."
                rows={12}
                className="resize-none text-base leading-relaxed border-slate-200 focus:border-blue-400"
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-slate-500">
                  {notes.length} characters
                </span>
                <Button onClick={handleSaveNotes} variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Items Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CheckCircle className="w-6 h-6 mr-2 text-purple-600" />
                Action Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Action Item */}
              <div className="border rounded-lg p-4 bg-slate-50">
                <h4 className="font-medium text-slate-800 mb-3">Add New Action Item</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="task" className="text-sm">Task Description</Label>
                    <Input
                      id="task"
                      value={newActionItem.task}
                      onChange={(e) => setNewActionItem(prev => ({ ...prev, task: e.target.value }))}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="assignee" className="text-sm">Assignee</Label>
                      <Input
                        id="assignee"
                        value={newActionItem.assignee}
                        onChange={(e) => setNewActionItem(prev => ({ ...prev, assignee: e.target.value }))}
                        placeholder="Who's responsible?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline" className="text-sm">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newActionItem.deadline}
                        onChange={(e) => setNewActionItem(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={addActionItem} size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Action Item
                  </Button>
                </div>
              </div>

              {/* Action Items List */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {actionItems.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">No action items yet</p>
                ) : (
                  actionItems.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-3 ${item.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`font-medium ${item.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {item.task}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                            <span>👤 {item.assignee}</span>
                            {item.deadline && <span>📅 {item.deadline}</span>}
                          </div>
                        </div>
                        <Button
                          onClick={() => toggleActionItem(item.id)}
                          size="sm"
                          variant={item.completed ? "default" : "outline"}
                          className="ml-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
