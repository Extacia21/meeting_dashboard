
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeetingRecorder as MeetingRecorderComponent } from '@/components/MeetingRecorder';

const MeetingRecorderPage = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
      <MeetingRecorderComponent />
    </div>
  );
};

export default MeetingRecorderPage;
