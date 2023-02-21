import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'sms-presentation';

  sendSmsForm = this.formBuilder.group({
    phoneNumber:"",
    message: ""
  })

  sequenceNumber: string | undefined;
  status: string | undefined;
  
  constructor(private formBuilder:FormBuilder, private http:HttpClient) {

  }

  onSubmit(): void {  
    
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*');

    interface MessageResponse {
      sequenceNumber: string,
      status: string
    }

  

    this.http.post<MessageResponse>('http://localhost:8080/messages/send', {
      phoneNumber: "123",
      body: "hi"
    },{headers}).subscribe({
      next:(response) => {
        this.sequenceNumber= response.sequenceNumber;
        this.status = response.status;
      },
      error: (error) => console.log(error)
    });

    
    this.sendSmsForm.reset();
  }
}
