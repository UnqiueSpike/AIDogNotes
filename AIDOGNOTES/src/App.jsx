import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DachshundCard from "./components/DachshundCard";
import Heatmap from "./components/Heatmap";
import MoodBar from "./components/MoodBar";
import ImportantCard from "./components/ImportantCard";
import TimeSelector from "./components/TimeSelector";
import TaskListNotebook from "./components/TaskListNotebook";

export default function App() {
  const [selectedTime, setSelectedTime] = useState('morning');

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - Dachshund Card */}
          <div className="w-1/2 p-6">
            <DachshundCard />
          </div>
          
          {/* Right Panel - Stats and Info */}
          <div className="w-1/2 p-4 space-y-3">
            {/* Activity Heatmap */}
            <div className="h-1/5 min-h-[120px]">
              <Heatmap />
            </div>
            
            {/* Mood and Important Cards */}
            <div className="h-2/5 min-h-[200px] flex space-x-2">
              <div className="w-1/2">
                <MoodBar />
              </div>
              <div className="w-1/2">
                <ImportantCard />
              </div>
            </div>
            
            {/* Time and Tasks */}
            <div className="h-2/5 min-h-[300px] flex space-x-3">
              <div className="w-1/3">
                <TimeSelector selectedTime={selectedTime} onTimeChange={setSelectedTime} />
              </div>
              <div className="w-2/3">
                <TaskListNotebook selectedTime={selectedTime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}