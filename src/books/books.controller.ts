import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async findAll() {
        return this.booksService.findAllBooks();
    }

    @Get(':id')
    async findOne(@Param('id') id: string ) {
        return this.booksService.findBookByID(id);
    }

  @Post()
  async createBook(
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('date_published') date_published: string,
  ) {
    return this.booksService.createBook(name, author, date_published);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('date_published') date_published: string,
  ) {
    return this.booksService.updateBook(id); // Update method could be expanded
  }

}
