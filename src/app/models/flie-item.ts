export class FileItem {
    public archive: File;
    public archiveName: String;
    public url: String;
    public isLoading: boolean;
    public progress: number;


    constructor( archive: FIle){
        this.archive = archive;
        this.archiveName = archive.name;
        this.isLoading = false;
        this.progress = 0;
    }
}