'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Edit, Download, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface ItineraryDay {
  id: string
  day: number
  title: string
  activities: Activity[]
}

interface Activity {
  id: string
  title: string
  description: string
  time: string
  location: string
  type: 'hotel' | 'flight' | 'activity' | 'meal' | 'transport' | 'other'
}

interface Itinerary {
  id: string
  name: string
  bookingId?: string
  days: ItineraryDay[]
  createdAt: Date
  updatedAt: Date
}

export default function ItineraryBuilderPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: '1',
      name: 'Sample Umrah Package 2024',
      bookingId: 'BK-001',
      days: [
        {
          id: 'd1',
          day: 1,
          title: 'Arrival in Madina',
          activities: [
            {
              id: 'a1',
              title: 'Flight Arrival',
              description: 'Welcome and airport pickup',
              time: '14:00',
              location: 'Madina International Airport',
              type: 'flight',
            },
          ],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(
    itineraries[0]
  )
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [newItineraryName, setNewItineraryName] = useState('')
  const [newActivityData, setNewActivityData] = useState<Partial<Activity>>({})
  const [selectedDay, setSelectedDay] = useState<ItineraryDay | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'itinerary' | 'day' | 'activity'
    id: string
  } | null>(null)

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination || !selectedItinerary) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const updatedItinerary = { ...selectedItinerary }

    if (source.droppableId === destination.droppableId) {
      // Reorder within same day
      const dayIndex = updatedItinerary.days.findIndex(
        (d) => d.id === source.droppableId
      )
      const day = updatedItinerary.days[dayIndex]
      const [moved] = day.activities.splice(source.index, 1)
      day.activities.splice(destination.index, 0, moved)
    } else {
      // Move activity to different day
      const sourceDayIndex = updatedItinerary.days.findIndex(
        (d) => d.id === source.droppableId
      )
      const destDayIndex = updatedItinerary.days.findIndex(
        (d) => d.id === destination.droppableId
      )

      const sourceDay = updatedItinerary.days[sourceDayIndex]
      const destDay = updatedItinerary.days[destDayIndex]

      const [moved] = sourceDay.activities.splice(source.index, 1)
      destDay.activities.splice(destination.index, 0, moved)
    }

    setItineraries((prev) =>
      prev.map((it) => (it.id === selectedItinerary.id ? updatedItinerary : it))
    )
    setSelectedItinerary(updatedItinerary)
    toast.success('Activity moved successfully')
  }

  const createNewItinerary = () => {
    if (!newItineraryName.trim()) {
      toast.error('Please enter a name')
      return
    }

    const newItinerary: Itinerary = {
      id: Date.now().toString(),
      name: newItineraryName,
      days: Array.from({ length: 5 }, (_, i) => ({
        id: `d${Date.now()}_${i}`,
        day: i + 1,
        title: `Day ${i + 1}`,
        activities: [],
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setItineraries([...itineraries, newItinerary])
    setSelectedItinerary(newItinerary)
    setNewItineraryName('')
    setIsNewDialogOpen(false)
    toast.success('Itinerary created successfully')
  }

  const addActivityToDay = (day: ItineraryDay) => {
    if (!newActivityData.title) {
      toast.error('Please enter activity title')
      return
    }

    if (!selectedItinerary) return

    const updatedItinerary = {
      ...selectedItinerary,
      days: selectedItinerary.days.map((d) =>
        d.id === day.id
          ? {
              ...d,
              activities: [
                ...d.activities,
                {
                  id: `a${Date.now()}`,
                  title: newActivityData.title || '',
                  description: newActivityData.description || '',
                  time: newActivityData.time || '09:00',
                  location: newActivityData.location || '',
                  type: (newActivityData.type as Activity['type']) || 'activity',
                },
              ],
            }
          : d
      ),
      updatedAt: new Date(),
    }

    setItineraries((prev) =>
      prev.map((it) => (it.id === selectedItinerary.id ? updatedItinerary : it))
    )
    setSelectedItinerary(updatedItinerary)
    setNewActivityData({})
    setSelectedDay(null)
    toast.success('Activity added successfully')
  }

  const deleteActivity = (dayId: string, activityId: string) => {
    if (!selectedItinerary) return

    const updatedItinerary = {
      ...selectedItinerary,
      days: selectedItinerary.days.map((d) =>
        d.id === dayId
          ? {
              ...d,
              activities: d.activities.filter((a) => a.id !== activityId),
            }
          : d
      ),
      updatedAt: new Date(),
    }

    setItineraries((prev) =>
      prev.map((it) => (it.id === selectedItinerary.id ? updatedItinerary : it))
    )
    setSelectedItinerary(updatedItinerary)
    toast.success('Activity deleted')
  }

  const duplicateItinerary = (itinerary: Itinerary) => {
    const duplicate: Itinerary = {
      ...itinerary,
      id: Date.now().toString(),
      name: `${itinerary.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setItineraries([...itineraries, duplicate])
    toast.success('Itinerary duplicated')
  }

  const handleDeleteItinerary = () => {
    if (!deleteConfirm || deleteConfirm.type !== 'itinerary') return

    setItineraries((prev) =>
      prev.filter((it) => it.id !== deleteConfirm.id)
    )
    setSelectedItinerary(
      itineraries.find((it) => it.id !== deleteConfirm.id) || null
    )
    setDeleteConfirm(null)
    toast.success('Itinerary deleted')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Itinerary Builder</h1>
          <p className="text-muted-foreground">
            Create and manage travel itineraries with drag-and-drop builder
          </p>
        </div>
        <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Itinerary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Itinerary</DialogTitle>
              <DialogDescription>
                Create a new itinerary from scratch
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Itinerary Name</Label>
                <Input
                  placeholder="e.g., Umrah Package 2024"
                  value={newItineraryName}
                  onChange={(e) => setNewItineraryName(e.target.value)}
                />
              </div>
              <Button onClick={createNewItinerary} className="w-full">
                Create Itinerary
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Itinerary List and Builder */}
      <Tabs className="w-full" defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">My Itineraries</TabsTrigger>
          <TabsTrigger value="builder" disabled={!selectedItinerary}>
            Builder
          </TabsTrigger>
        </TabsList>

        {/* Itinerary List */}
        <TabsContent value="list" className="space-y-4">
          <motion.div className="grid gap-4">
            {itineraries.map((itinerary) => (
              <motion.div
                key={itinerary.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className="cursor-pointer border-2 transition-colors hover:border-primary"
                  onClick={() => {
                    setSelectedItinerary(itinerary)
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{itinerary.name}</CardTitle>
                        <CardDescription>
                          {itinerary.days.length} days • Created{' '}
                          {itinerary.createdAt.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            duplicateItinerary(itinerary)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteConfirm({
                              type: 'itinerary',
                              id: itinerary.id,
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Itinerary Builder */}
        {selectedItinerary && (
          <TabsContent value="builder" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedItinerary.name}</CardTitle>
                  <CardDescription>
                    Drag and drop activities between days to organize your itinerary
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <motion.div className="grid gap-6">
                {selectedItinerary.days.map((day) => (
                  <motion.div
                    key={day.id}
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Day {day.day}: {day.title}</CardTitle>
                            <CardDescription>
                              {day.activities.length} activities
                            </CardDescription>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => setSelectedDay(day)}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Activity
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Add Activity</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    placeholder="Activity title"
                                    value={newActivityData.title || ''}
                                    onChange={(e) =>
                                      setNewActivityData({
                                        ...newActivityData,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Time</Label>
                                  <Input
                                    type="time"
                                    value={newActivityData.time || '09:00'}
                                    onChange={(e) =>
                                      setNewActivityData({
                                        ...newActivityData,
                                        time: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Location</Label>
                                  <Input
                                    placeholder="Location"
                                    value={newActivityData.location || ''}
                                    onChange={(e) =>
                                      setNewActivityData({
                                        ...newActivityData,
                                        location: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    placeholder="Activity details"
                                    value={newActivityData.description || ''}
                                    onChange={(e) =>
                                      setNewActivityData({
                                        ...newActivityData,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <Button
                                  onClick={() => addActivityToDay(day)}
                                  className="w-full"
                                >
                                  Add Activity
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Droppable droppableId={day.id} type="ACTIVITY">
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={`space-y-3 min-h-32 rounded-lg p-4 transition-colors ${
                                snapshot.isDraggingOver
                                  ? 'bg-primary/10'
                                  : 'bg-muted/50'
                              }`}
                            >
                              {day.activities.length === 0 ? (
                                <p className="text-center text-sm text-muted-foreground py-8">
                                  No activities yet. Drag activities here or add new ones.
                                </p>
                              ) : (
                                day.activities.map((activity, index) => (
                                  <Draggable
                                    key={activity.id}
                                    draggableId={activity.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <motion.div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        whileHover={{ scale: 1.02 }}
                                        whileDrag={{ scale: 1.05 }}
                                      >
                                        <Card
                                          className={`cursor-move transition-all ${
                                            snapshot.isDragging
                                              ? 'shadow-lg'
                                              : ''
                                          }`}
                                        >
                                          <CardContent className="pt-4">
                                            <div className="space-y-2">
                                              <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                  <h4 className="font-semibold">
                                                    {activity.time} -{' '}
                                                    {activity.title}
                                                  </h4>
                                                  <p className="text-sm text-muted-foreground">
                                                    {activity.location}
                                                  </p>
                                                  {activity.description && (
                                                    <p className="text-sm mt-1">
                                                      {activity.description}
                                                    </p>
                                                  )}
                                                </div>
                                                <Button
                                                  size="sm"
                                                  variant="destructive"
                                                  onClick={() =>
                                                    deleteActivity(
                                                      day.id,
                                                      activity.id
                                                    )
                                                  }
                                                >
                                                  <Trash2 className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </motion.div>
                                    )}
                                  </Draggable>
                                ))
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </DragDropContext>

            <motion.div variants={itemVariants}>
              <Button className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
            </motion.div>
          </TabsContent>
        )}
      </Tabs>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Itinerary?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The itinerary will be permanently deleted.
          </AlertDialogDescription>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItinerary}>
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
