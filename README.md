# EmailRepo


This is a simple email app I built to play with that lets you send emails.

This app uses an AngularJS with an AngularJS emailController and an AngularJS emailService to sends out an HTTP request which hits the api/email url.

It hits the url in my EmailApiController in C# which runs a task function in an emailService class. This sends out a simple email using send grid. 
