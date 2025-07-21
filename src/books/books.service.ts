import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
    async findAllBooks(){
        return "all students";
    }

    async findBookByID(id: string){
        return `book ${id}`;
    }

    async createBook(name: any, author: any, date_published: any){
        return `created book ${name}`;
    }

    async deleteBook(id: any){
        return `deleted ${id}`;
    }

    async updateBook(id: any){
        return `updated ${id}`;
    }
}
