import React, { useState, useRef, useEffect } from 'react';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { LayoutElement, EventLayout } from '../../types';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Copy, 
  RotateCw, 
  Save, 
  RefreshCw, 
  Users, 
  Maximize2, 
  Minimize2, 
  Move, 
  Sparkles, 
  Check, 
  Eye, 
  Square, 
  Circle, 
  Music, 
  Wine, 
  Camera, 
  DoorOpen,
  ArrowRight
} from 'lucide-react';

export const PlannerPage: React.FC = () => {
  const { activeEvent, layout, refreshData, showToast } = useEvent();

  const [elements, setElements] = useState<LayoutElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('');

  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize elements from activeEvent layout
  useEffect(() => {
    if (layout?.elements) {
      setElements(layout.elements);
      if (layout.lastUpdated) {
        setLastSavedTime(new Date(layout.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    }
  }, [layout]);

  const selectedElement = elements.find(el => el.id === selectedId);

  // Capacity calculation
  const totalSeats = elements.reduce((acc, el) => acc + (el.capacity || 0), 0);
  const targetGuests = activeEvent?.guestTargetCount || 150;

  // Add Element Helper
  const addElement = (type: LayoutElement['type'], label: string, width = 80, height = 80, capacity = 0, color = '#8b5cf6') => {
    const newEl: LayoutElement = {
      id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      label,
      x: 350,
      y: 200,
      width,
      height,
      rotation: 0,
      capacity,
      color
    };
    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
    showToast(`Added ${label} to floor canvas`, 'info');
  };

  // Duplicate Selected Element
  const handleDuplicate = () => {
    if (!selectedElement) return;
    const duplicated: LayoutElement = {
      ...selectedElement,
      id: `elem_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      label: `${selectedElement.label} (Copy)`,
      x: Math.min(800, selectedElement.x + 30),
      y: Math.min(500, selectedElement.y + 30)
    };
    setElements(prev => [...prev, duplicated]);
    setSelectedId(duplicated.id);
    showToast(`Duplicated ${selectedElement.label}`, 'info');
  };

  // Delete Selected Element
  const handleDelete = () => {
    if (!selectedId) return;
    setElements(prev => prev.filter(el => el.id !== selectedId));
    setSelectedId(null);
    showToast('Element removed from canvas', 'info');
  };

  // Rotate Selected Element
  const handleRotate = (degrees = 45) => {
    if (!selectedId) return;
    setElements(prev => prev.map(el => {
      if (el.id === selectedId) {
        return { ...el, rotation: (el.rotation + degrees) % 360 };
      }
      return el;
    }));
  };

  // Update selected element property
  const updateSelected = (updates: Partial<LayoutElement>) => {
    if (!selectedId) return;
    setElements(prev => prev.map(el => {
      if (el.id === selectedId) {
        return { ...el, ...updates };
      }
      return el;
    }));
  };

  // Mouse Dragging on Canvas
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    const el = elements.find(item => item.id === id);
    if (!el || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    setDragOffset({
      x: mouseX - el.x,
      y: mouseY - el.y
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    // Bounds checking inside canvas (900x600)
    const el = elements.find(item => item.id === selectedId);
    const w = el?.width || 80;
    const h = el?.height || 80;

    newX = Math.max(10, Math.min(880 - w, newX));
    newY = Math.max(10, Math.min(580 - h, newY));

    // Snap to grid (10px)
    newX = Math.round(newX / 10) * 10;
    newY = Math.round(newY / 10) * 10;

    setElements(prev => prev.map(item => {
      if (item.id === selectedId) {
        return { ...item, x: newX, y: newY };
      }
      return item;
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Save Layout to storage
  const handleSave = async () => {
    if (!activeEvent) return;
    setIsSaving(true);
    try {
      await api.saveLayout(activeEvent.id, {
        name: `${activeEvent.title} Layout`,
        elements,
        canvasWidth: 900,
        canvasHeight: 600
      });
      await refreshData();
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSavedTime(timeStr);
      showToast('Space Layout saved successfully!', 'success');
    } catch (e: any) {
      showToast('Error saving layout', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Preset Layouts
  const applyPreset = (preset: 'banquet' | 'keynote' | 'cocktail') => {
    if (preset === 'banquet') {
      const banquetElements: LayoutElement[] = [
        { id: 'el_stage', type: 'stage', label: 'Main Stage', x: 320, y: 40, width: 260, height: 70, rotation: 0, color: '#8b5cf6' },
        { id: 'el_dance', type: 'dancefloor', label: 'Central Dance Floor', x: 350, y: 200, width: 200, height: 160, rotation: 0, color: '#ec4899' },
        { id: 'el_t1', type: 'table-round', label: 'VIP Table 1', x: 180, y: 160, width: 80, height: 80, rotation: 0, capacity: 10, color: '#6366f1' },
        { id: 'el_t2', type: 'table-round', label: 'VIP Table 2', x: 640, y: 160, width: 80, height: 80, rotation: 0, capacity: 10, color: '#6366f1' },
        { id: 'el_t3', type: 'table-round', label: 'Family East', x: 180, y: 280, width: 80, height: 80, rotation: 0, capacity: 10, color: '#6366f1' },
        { id: 'el_t4', type: 'table-round', label: 'Family West', x: 640, y: 280, width: 80, height: 80, rotation: 0, capacity: 10, color: '#6366f1' },
        { id: 'el_t5', type: 'table-round', label: 'Colleagues', x: 230, y: 400, width: 80, height: 80, rotation: 0, capacity: 10, color: '#6366f1' },
        { id: 'el_t6', type: 'table-round', label: 'Friends', x: 590, y: 400, width: 80, height: 80, rotation: 0, capacity: 10, color: '#6366f1' },
        { id: 'el_bar', type: 'bar', label: 'Cocktail Island', x: 60, y: 220, width: 60, height: 180, rotation: 0, color: '#06b6d4' },
        { id: 'el_photo', type: 'photobooth', label: 'Photobooth', x: 770, y: 220, width: 80, height: 80, rotation: 0, color: '#10b981' },
        { id: 'el_ent', type: 'entrance', label: 'Entrance Arch', x: 370, y: 520, width: 160, height: 40, rotation: 0, color: '#a855f7' }
      ];
      setElements(banquetElements);
      showToast('Loaded Gala Banquet preset layout', 'info');
    } else if (preset === 'keynote') {
      const keynoteElements: LayoutElement[] = [
        { id: 'el_stage', type: 'stage', label: 'Keynote Stage & Podium', x: 250, y: 40, width: 400, height: 80, rotation: 0, color: '#8b5cf6' },
        { id: 'el_t1', type: 'table-rect', label: 'Executive Row A', x: 180, y: 180, width: 240, height: 40, rotation: 0, capacity: 12, color: '#3b82f6' },
        { id: 'el_t2', type: 'table-rect', label: 'Executive Row B', x: 480, y: 180, width: 240, height: 40, rotation: 0, capacity: 12, color: '#3b82f6' },
        { id: 'el_t3', type: 'table-rect', label: 'Attendee Row C', x: 180, y: 260, width: 240, height: 40, rotation: 0, capacity: 12, color: '#3b82f6' },
        { id: 'el_t4', type: 'table-rect', label: 'Attendee Row D', x: 480, y: 260, width: 240, height: 40, rotation: 0, capacity: 12, color: '#3b82f6' },
        { id: 'el_dj', type: 'dj', label: 'AV & Translation Console', x: 350, y: 460, width: 200, height: 50, rotation: 0, color: '#f43f5e' }
      ];
      setElements(keynoteElements);
      showToast('Loaded Corporate Keynote preset layout', 'info');
    } else {
      const cocktailElements: LayoutElement[] = [
        { id: 'el_stage', type: 'stage', label: 'DJ Stage & Live Music', x: 350, y: 40, width: 200, height: 60, rotation: 0, color: '#f43f5e' },
        { id: 'el_dance', type: 'dancefloor', label: 'Center Dance Area', x: 350, y: 170, width: 200, height: 180, rotation: 0, color: '#ec4899' },
        { id: 'el_bar1', type: 'bar', label: 'Main Bar', x: 80, y: 120, width: 70, height: 160, rotation: 0, color: '#06b6d4' },
        { id: 'el_bar2', type: 'bar', label: 'Tasting Bar', x: 750, y: 120, width: 70, height: 160, rotation: 0, color: '#06b6d4' },
        { id: 'el_lounge1', type: 'lounge', label: 'VIP Velvet Lounge', x: 150, y: 380, width: 140, height: 80, rotation: 0, capacity: 8, color: '#a855f7' },
        { id: 'el_lounge2', type: 'lounge', label: 'Terrace Lounge', x: 610, y: 380, width: 140, height: 80, rotation: 0, capacity: 8, color: '#a855f7' }
      ];
      setElements(cocktailElements);
      showToast('Loaded Cocktail Soiree preset layout', 'info');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>2D SPATIAL ARCHITECTURE</span>
            <span>·</span>
            <span>{activeEvent?.venueName || 'Custom Floor Plan'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Visual Space Planner
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Drag, rotate, and resize floor elements. Table configurations automatically connect to guest seating.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Preset Buttons */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => applyPreset('banquet')}
              className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Banquet
            </button>
            <button
              onClick={() => applyPreset('keynote')}
              className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Keynote
            </button>
            <button
              onClick={() => applyPreset('cocktail')}
              className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Cocktail
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Floor Plan'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Status Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Total Placed Zones:</span>
          <span className="font-mono font-bold text-white tabular-nums">{elements.length}</span>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Seated Capacity:</span>
          <span className="font-mono font-bold text-purple-300 tabular-nums">
            {totalSeats} / {targetGuests} Pax
          </span>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Grid Snap:</span>
          <span className="font-mono text-emerald-400 font-bold">10px Calibrated</span>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Last Synced:</span>
          <span className="font-mono text-slate-300">{lastSavedTime || 'Current'}</span>
        </div>
      </div>

      {/* Main Studio Grid: Toolbar + Canvas + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Toolbar (2 cols on lg) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-4 border border-white/5 space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
            Add Elements
          </span>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            <button
              onClick={() => addElement('stage', 'Main Stage', 260, 70, 0, '#8b5cf6')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <Square className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Stage</span>
            </button>

            <button
              onClick={() => addElement('table-round', `Table ${elements.filter(e => e.type.startsWith('table')).length + 1}`, 80, 80, 10, '#6366f1')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                <Circle className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Round Table (10)</span>
            </button>

            <button
              onClick={() => addElement('table-rect', `Banquet Table ${elements.filter(e => e.type.startsWith('table')).length + 1}`, 160, 50, 8, '#f59e0b')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <Square className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Rect Table (8)</span>
            </button>

            <button
              onClick={() => addElement('dancefloor', 'Dance Floor', 200, 160, 0, '#ec4899')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0">
                <Music className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Dance Floor</span>
            </button>

            <button
              onClick={() => addElement('bar', 'Cocktail Bar', 60, 160, 0, '#06b6d4')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                <Wine className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Bar Island</span>
            </button>

            <button
              onClick={() => addElement('photobooth', 'Photobooth', 80, 80, 0, '#10b981')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Photobooth</span>
            </button>

            <button
              onClick={() => addElement('entrance', 'Grand Entrance Arch', 160, 40, 0, '#a855f7')}
              className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <DoorOpen className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Entrance Arch</span>
            </button>
          </div>
        </div>

        {/* Center Interactive 2D Canvas (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-2">
          
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Canvas Viewport (900px × 600px Scale)</span>
            <span>Click to select · Drag to move</span>
          </div>

          <div className="w-full overflow-x-auto rounded-3xl glass-panel-glow border border-white/10 p-2 bg-[#050810]">
            <div
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => setSelectedId(null)}
              style={{ width: '900px', height: '600px' }}
              className="relative bg-[#060913] bg-venue-grid rounded-2xl select-none cursor-crosshair overflow-hidden border border-white/5"
            >
              {/* Room perimeter indicators */}
              <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-600 uppercase">
                North Terrace Boundary
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-600 uppercase">
                Main Reception Foyer
              </div>

              {/* Placed Elements */}
              {elements.map(el => {
                const isSelected = el.id === selectedId;
                const isRound = el.type === 'table-round';

                return (
                  <div
                    key={el.id}
                    onMouseDown={e => handleMouseDown(e, el.id)}
                    style={{
                      position: 'absolute',
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: `${el.width}px`,
                      height: `${el.height}px`,
                      transform: `rotate(${el.rotation}deg)`,
                      borderRadius: isRound ? '9999px' : '14px',
                      backgroundColor: `${el.color}25`,
                      borderColor: isSelected ? '#ffffff' : `${el.color}90`,
                      boxShadow: isSelected ? `0 0 20px ${el.color}80` : 'none'
                    }}
                    className={`border-2 flex flex-col items-center justify-center text-center p-1 cursor-grab active:cursor-grabbing transition-shadow group ${
                      isSelected ? 'z-20 ring-2 ring-white/40' : 'z-10'
                    }`}
                  >
                    <span
                      style={{ color: el.color }}
                      className="text-[11px] font-bold font-display leading-tight truncate max-w-full px-1 drop-shadow"
                    >
                      {el.label}
                    </span>

                    {el.capacity && el.capacity > 0 ? (
                      <span className="text-[9px] font-mono text-slate-200 opacity-90 mt-0.5 flex items-center gap-0.5">
                        <Users className="w-2.5 h-2.5" />
                        {el.capacity}
                      </span>
                    ) : null}

                    {/* Rotation indicator notch */}
                    {isSelected && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Inspector & Controls (3 cols on lg) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-5 border border-white/5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold font-display text-white uppercase tracking-wider">
              Element Inspector
            </span>
            {selectedElement && (
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                Selected
              </span>
            )}
          </div>

          {selectedElement ? (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Element Label</label>
                <input
                  type="text"
                  value={selectedElement.label}
                  onChange={e => updateSelected({ label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium focus:outline-none focus:border-purple-500"
                />
              </div>

              {selectedElement.type.startsWith('table') && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Seating Capacity</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={selectedElement.capacity || 10}
                    onChange={e => updateSelected({ capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Width (px)</label>
                  <input
                    type="number"
                    min="40"
                    max="500"
                    step="10"
                    value={selectedElement.width}
                    onChange={e => updateSelected({ width: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Height (px)</label>
                  <input
                    type="number"
                    min="40"
                    max="500"
                    step="10"
                    value={selectedElement.height}
                    onChange={e => updateSelected({ height: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              {/* Position Readout */}
              <div className="grid grid-cols-2 gap-3 text-slate-400 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  X: {selectedElement.x}px
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  Y: {selectedElement.y}px
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => handleRotate(45)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 text-purple-400" />
                  <span>Rotate (+45°)</span>
                </button>

                <button
                  onClick={handleDuplicate}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Duplicate Zone</span>
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full py-2 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 font-semibold flex items-center justify-center gap-2 border border-rose-800/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Element</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2 text-slate-500 text-xs">
              <Move className="w-8 h-8 mx-auto text-slate-600" />
              <p>Select any item on the floor canvas to adjust its dimensions, seats, or rotation.</p>
            </div>
          )}

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => {
                if (confirm('Clear all placed layout elements?')) {
                  setElements([]);
                  setSelectedId(null);
                }
              }}
              className="w-full py-2 rounded-xl text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
            >
              Clear Entire Floor Plan
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
