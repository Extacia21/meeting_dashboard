
import React from 'react';
import { Header } from '@/components/Header';
import { MeetingStats } from '@/components/MeetingStats';
import { MeetingList } from '@/components/MeetingList';
import { CreateMeetingFab } from '@/components/CreateMeetingFab';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Meeting Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage your meetings efficiently and track progress</p>
        </div>
        
        <MeetingStats />
        <MeetingList />
        <CreateMeetingFab />
      </main>
    </div>
  );
};

export default Index;
