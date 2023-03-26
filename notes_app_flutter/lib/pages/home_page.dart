import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:notes_app_flutter/pages/add_new_note.dart';
import 'package:notes_app_flutter/providers/notes_provider.dart';
import 'package:provider/provider.dart';
import 'package:notes_app_flutter/models/note.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    NotesProvider notesProvider = Provider.of<NotesProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Notes App"),
        centerTitle: true,
      ),
      body: (notesProvider.isLoading==false)?SafeArea(
        child: (notesProvider.notes.length>0) ?GridView.builder(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2),
            itemCount: notesProvider.notes.length,
            itemBuilder: (context, index) {
              Note currentNote = notesProvider.notes[index];

              return GestureDetector(
                  onTap: () {
                    Navigator.push(
                        context,
                        CupertinoPageRoute(
                          builder: (context) =>  AddNewNotePage(isUpdate: true,note: currentNote,),
                        ));
                  },
                  onLongPress: () {
                    notesProvider.deletenote(currentNote);
                  },
                  child: Container(
                    margin: const EdgeInsets.all(5),
                    padding: const EdgeInsets.all(5),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.grey, width: 2)),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            currentNote.title!,
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
                          const SizedBox(
                            height: 7,
                          ),
                          Text(
                            currentNote.content!,
                            style: TextStyle(
                                fontSize: 18, color: Colors.grey[700]),
                          ),
                        ]),
                  ));
            }): const Center(child: Text("No Notes Yet")),
      ): Center(child:  CircularProgressIndicator(),),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            CupertinoPageRoute(
                fullscreenDialog: true,
                builder: (context) => const AddNewNotePage(isUpdate:false)),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
