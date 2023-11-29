import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class MyFirstPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata){
        console.log(value);
        console.log(metadata);
        return value;
    }
}