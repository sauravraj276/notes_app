import 'package:flutter/material.dart';
import 'package:notes_app_flutter/models/note.dart';
import 'package:notes_app_flutter/services/api_services.dart';

class NotesProvider with ChangeNotifier {
  bool isLoading = true;
  List<Note> notes = [];

  NotesProvider() {
    fetchNotes();
  }

  void addNote(Note note) {
    notes.add(note);
    notifyListeners();
    ApiService.addNote(note);
  }

  void updateNote(Note oldNote, Note newNote) {
    int indexOfNote =
        notes.indexOf(notes.firstWhere((element) => element.id == oldNote.id));
    notes[indexOfNote] = newNote;
    notifyListeners();
    ApiService.addNote(newNote);
  }

  void deletenote(Note note) {
    int indexOfNote =
        notes.indexOf(notes.firstWhere((element) => element.id == note.id));
    notes.removeAt(indexOfNote);
    notifyListeners();
    ApiService.deleteNote(note);
  }

  void fetchNotes() async {
    notes = await ApiService.fetchNotes("sauravraj276");
    isLoading = false;
    notifyListeners();
  }
}
