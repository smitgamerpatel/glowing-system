import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Video, 
  FileText, 
  X, 
  ExternalLink, 
  LogOut,
  BookOpen,
  Youtube
} from 'lucide-react';
import { 
  useLocalStorage, 
  Lecture, 
  Note, 
  formatYouTubeUrl 
} from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [lectures, setLectures] = useLocalStorage<Lecture[]>('genius-lectures', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('genius-notes', []);
  
  // Lecture Form State
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureUrl, setLectureUrl] = useState('');
  const [lectureCategory, setLectureCategory] = useState<Lecture['category']>('Std 9 English');

  // Note Form State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteStandard, setNoteStandard] = useState('10');
  const [noteMedium, setNoteMedium] = useState<Note['medium']>('English');
  const [noteSubject, setNoteSubject] = useState('');
  const [noteFileName, setNoteFileName] = useState('');

  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureTitle || !lectureUrl) return;

    const newLecture: Lecture = {
      id: Math.random().toString(36).substr(2, 9),
      title: lectureTitle,
      youtubeLink: lectureUrl,
      category: lectureCategory,
    };

    setLectures([...lectures, newLecture]);
    setLectureTitle('');
    setLectureUrl('');
  };

  const handleDeleteLecture = (id: string) => {
    setLectures(lectures.filter(l => l.id !== id));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteSubject || !noteFileName) return;

    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: noteTitle,
      standard: noteStandard,
      medium: noteMedium,
      subject: noteSubject,
      fileName: noteFileName,
      fileUrl: '#', // Placeholder for simulation
      fileType: noteFileName.split('.').pop() || 'pdf',
    };

    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteSubject('');
    setNoteFileName('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 md:p-8">
      <Card className="w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">Content Manager</CardTitle>
            <CardDescription>Update your institute's digital library</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <Tabs defaultValue="lectures" className="h-full flex flex-col">
            <div className="px-6 py-2 border-b bg-card">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="lectures" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" /> Lectures
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Notes
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="lectures" className="mt-0 space-y-8">
                {/* Add Lecture Form */}
                <section className="bg-accent/30 p-6 rounded-xl border border-accent">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" /> Add New Video Lecture
                  </h3>
                  <form onSubmit={handleAddLecture} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor="l-title">Video Title</Label>
                      <Input 
                        id="l-title" 
                        placeholder="Ex: Linear Equations Intro" 
                        value={lectureTitle} 
                        onChange={(e) => setLectureTitle(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="l-url">YouTube Link</Label>
                      <Input 
                        id="l-url" 
                        placeholder="https://youtube.com/watch?v=..." 
                        value={lectureUrl} 
                        onChange={(e) => setLectureUrl(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="l-cat">Category</Label>
                      <Select 
                        value={lectureCategory} 
                        onValueChange={(v: any) => setLectureCategory(v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Std 9 English">Std 9 English</SelectItem>
                          <SelectItem value="Std 10 English">Std 10 English</SelectItem>
                          <SelectItem value="Std 12 English">Std 12 English</SelectItem>
                          <SelectItem value="English Grammar">English Grammar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Save Video
                    </Button>
                  </form>
                </section>

                {/* Lectures List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Manage Existing Videos</h3>
                  {lectures.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                      No videos added yet. Add your first lecture above.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {lectures.map((lecture) => (
                        <div 
                          key={lecture.id} 
                          className="flex items-center justify-between p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-50 rounded-lg">
                              <Youtube className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">{lecture.title}</p>
                              <p className="text-sm text-muted-foreground">{lecture.category} • {lecture.youtubeLink.substring(0, 30)}...</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={lecture.youtubeLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="p-2 hover:bg-muted rounded-full"
                            >
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </a>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteLecture(lecture.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-0 space-y-8">
                {/* Add Note Form */}
                <section className="bg-accent/30 p-6 rounded-xl border border-accent">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" /> Upload Study Material
                  </h3>
                  <form onSubmit={handleAddNote} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor="n-title">Document Title</Label>
                      <Input 
                        id="n-title" 
                        placeholder="Ex: Chapter 1 Geometry Notes" 
                        value={noteTitle} 
                        onChange={(e) => setNoteTitle(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="n-subject">Subject</Label>
                      <Input 
                        id="n-subject" 
                        placeholder="Ex: Mathematics" 
                        value={noteSubject} 
                        onChange={(e) => setNoteSubject(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="n-std">Standard</Label>
                      <Select value={noteStandard} onValueChange={setNoteStandard}>
                        <SelectTrigger>
                          <SelectValue placeholder="Standard" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              Std {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="n-medium">Medium</Label>
                      <Select 
                        value={noteMedium} 
                        onValueChange={(v: any) => setNoteMedium(v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English Medium</SelectItem>
                          <SelectItem value="Gujarati">Gujarati Medium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="n-file">File Name (Simulated Upload)</Label>
                      <Input 
                        id="n-file" 
                        placeholder="Ex: geometry-notes.pdf" 
                        value={noteFileName} 
                        onChange={(e) => setNoteFileName(e.target.value)} 
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Add Note
                    </Button>
                  </form>
                </section>

                {/* Notes List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Manage Study Materials</h3>
                  {notes.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                      No study materials added yet.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {notes.map((note) => (
                        <div 
                          key={note.id} 
                          className="flex items-center justify-between p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{note.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Std {note.standard} • {note.medium} • {note.subject} • {note.fileName}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>

        <div className="p-4 border-t bg-muted/30 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Done</Button>
        </div>
      </Card>
    </div>
  );
}
