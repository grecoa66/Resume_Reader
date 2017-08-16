import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

MainController.$inject = ['$http','AnalyzerService'];

function MainController($http, AnalyzerService) {

  var self = this;

  //class var for the text of the uploaded resume
  this.resumeText = self.resumeText;
  this.$http = $http;
  this.analyzerSerivce = AnalyzerService;
  this.wordList = [];
  this.results = [];
  this.newWord = "";

  // Open source lib for digesting docx files.
  // Look up npm mammoth
  var mammoth = require("mammoth");


  //functions
  this.handleFileSelect = handleFileSelect;
  this.readFileInputEventAsArrayBuffer = readFileInputEventAsArrayBuffer;

  /**
  * Event listener for user uploading document. This will be
  * triggered when the user choses a file. It will call the
  * handleFileSelect function
  */
  document.getElementById('file')
    .addEventListener("change", this.handleFileSelect, false);

  /**
  * This function will take the event from the upload button on the
  * html page. It was take the path to file the user selects. Next
  * it calls the readFileInputEventAsArrayBuffer and passes the event
  * and a call back function. When readFileInputEventAsArrayBuffer is
  * done reading the  word doc, the call back is
  * triggered. In the callback, call mammoth lib, turns the junk text
  * from the reader into a byte stream, and then into raw text. When
  * the raw text is returned, call the conditionText function.
  *
  */
  function handleFileSelect(event) {

    readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
      mammoth.extractRawText({arrayBuffer: arrayBuffer})
        .then((result) => {
          //assign resume text to class variable
          self.resumeText = result.value;
          console.log(self.resumeText);
        })
        .done();
    });
  }

  /**
  * This function creates a javascript file reader from the standard
  * lib. It takes in the file that was uploaded by the user and reads
  * the contents and produced junk text. When the file is loaded,
  * call the callback that was passed in.
  */
  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function(loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }


  //Adds attributes from the front end into a list
  this.addToList = () => {

    //call function to split words on comma if one exists
    if(this.newWord.includes(',')){
      var splitWords = splitCommas(this.newWord);
      //add the newly split words to the word list
      for(var word in splitWords){
        if(!this.wordList.includes(splitWords[word])){
          this.wordList.push(splitWords[word]);
        }
      }
      //else, add the word normally
    }else{
      if(!this.wordList.includes(this.newWord)){
        this.wordList.push(this.newWord);
      }
    }

    //clear the scope variable value
    this.newWord = "";

    console.log("wordList: ", this.wordList);
  }


  this.analyzeResume = () => {
    if(this.resumeText === "" || typeof this.resumeText === 'undefined'){
      alert("Please upload a resume!");
      return;

    }else if(! this.wordList.length > 0){
      alert("Please choose keywords!");
      return;

    }

    //This call will get the words in the resume
    var wordsFoundList = this.analyzerSerivce.beginAnalysis(this.resumeText, this.wordList);

    //This call will display the results
    this.displayResults(wordsFoundList);

    console.log("in the analyze resume");
  }

  this.displayResults = (wordsFoundList) =>{

    for(var i in this.wordList){
      if(wordsFoundList.includes(this.wordList[i])){
        var resObj = {
          word : this.wordList[i],
          found :true,
          class : 'success'
        }
      }else{
        var resObj = {
          word : this.wordList[i],
          found :false,
          class : 'danger'
        }
      }
      this.results.push(resObj);
    }
    console.log(this.result);
  }

  /**
  * This function is going to split a string on commas and return an array
  * of the different words.
  */
  function splitCommas(words){
    console.log("Splitting commas");
    var splitList = words.split(", ");

    return splitList;
  }

}

export default angular.module('resumeReaderApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    bindings: {

    },
    template: require('./main.html'),
    controller: MainController
  })
  .name;
