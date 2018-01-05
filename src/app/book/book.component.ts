import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['title', 'author', 'action'];

  books: any;

  constructor(private http: HttpClient) { }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.books.filter = filterValue;
  }

  ngOnInit() {
    this.http.get('/book').subscribe(data => {
      console.log("Data JSON",JSON.stringify(data));

      
      this.books = new MatTableDataSource(JSON.parse(JSON.stringify(data)));
      this.books.paginator = this.paginator;
    });
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    
  }

}
