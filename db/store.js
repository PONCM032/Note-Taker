
class Store {
    read(){
        return readFileAsync("db/db.json", "utf8")
    };
    
    write(notes){
        return writeFileAsync("db/db.json", JSON.stringify(notes))
    };

    getNote(){
        return this.read().then(function(notes){
            let parseNotes = [];
                try {
                        parseNotes = [].concat(JSON.parse(notes))
                    } catch (error) {
                        parseNotes = [];
                    } return parseNotes;
                }
        )};

    addNote(notes){
        const {title, text} = notes;

        if(!title||!text){
            throw new Error("addNote not saving");
        }   
        //add unique id for notes//

        return this.getNote().then(notes => [...notes, newNote]).then(updateNotes => this.write(updateNotes)).then(() => newNote);
    };

    removeNote(id){
        return this.getNote().then(notes => notes.filter(note => note.id != id)).then(filterNotes => this.write(filterNotes))
        };
    };

module.exports = new Store();
        
    

    