import { Document } from "mongoose";
export type FileDocument = File & Document;
export declare class File {
    id: string;
    name: string;
}
export declare const FileSchema: import("mongoose").Schema<File, import("mongoose").Model<File, any, any, any, Document<unknown, any, File> & File & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File, Document<unknown, {}, import("mongoose").FlatRecord<File>> & import("mongoose").FlatRecord<File> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
