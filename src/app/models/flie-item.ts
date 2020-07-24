export class FileItem {
    public archive: File;
    public archiveName: string;
    public url: string;
    public isLoading: boolean;
    public progress: number;


    constructor( archive: File){
        this.archive = archive;
        this.archiveName = archive.name;
        this.isLoading = false;
        this.progress = 0;
    }
}