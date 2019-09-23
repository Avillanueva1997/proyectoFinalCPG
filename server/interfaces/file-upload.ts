export interface FileUpload {
    name: string;
    data: any;
    //size: string;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;

    mv: Function;
}