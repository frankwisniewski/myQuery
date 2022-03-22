# mein kleines JS - Schweizer Messer

## Vorwort

Es gibt viele Javascript Bibliotheken *(Librarys)*, allen voran ist **jQuery** zu nennen, die Library mit dem größten Verbreitungsgrad.  
  
Die Codegröße von **jQuery** umfasst inzwischen 10881 Zeilen und benötigt in der unkomprimierten Version knapp 300 Kilobyte. Dafür bekommt man eine Vielzahl von Funktionen, die man in der Regel nicht alle benötigt.   
  
Wenn man in sicherheitsrelevanten Bereichen arbeitet, ist es sinnvoll, jede einzelne Zeile des Codes zu kennen, um sicher zu gehen, dass keine unvorhergesehen Zustände auftreten können. Auch **jQuery** musste durch diverse, manchmal auch erfolgreiche XXS Attacken schon einige Sicherheitsupdates erhalten.  

Ich will diese Library hier nicht schlecht reden, ganz im Gegenteil, sie gehört zu den besten Librarys überhaupt. 

Was mir gefällt, ist die einfache Syntax und natürlich die Verkettung von Methoden *(Method Chaining)*, darauf möchte ich natürlich nicht verzichten.

## wie sieht es ohne Bibliothek aus:

Als Grundlage dient folgende HTML Datei:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  <script src="mylib.js"></script>
</body>
</html>
```

die dazugehörige Javascript Datei *mylib.js* ist noch wenig gefüllt und erhält nur die Deklaration *use strict*, damit man *Reference Errors* bei bspw. fehlenden Variablendeklarationen erhält.

```js
"use strict";
```
  
Ich möchte nun den Absätzen ```<p>``` die Klassen *red* und *bold* zuweisen. Benutze ich keine Library, ist hierzu folgender Code erforderlich:

```js
"use strict";
document.querySelectorAll( 'p' )
  .forEach( _node => _node
    .classList.add( "red" , "bold" ) )
``` 

In **jQuery** wird dieses Problem wie folgt gelöst:  
  
```js
"use strict";
$( "p" ).addClass( "red bold" );
```

Aus 100 Zeichen werden 32 Zeichen. Genau das möchte ich mit meiner eigenen Library nachbilden. Allerdings nur mit den Funktionen, die ich in der Praxis auch benötige und die ich teilweise auch mit einer anderen Syntax versehe. So wäre mir die Trennung der Klassen durch Kommas ganz recht. 

```js
"use strict";
$('p').addClass( "red , bold" ) 
```

## erste Schritte

packen wir *document.querySelectorAll* in eine Function und rufen diese auf:

```js
"use strict";
const $ = function ( selector ) {
  return document.querySelectorAll( selector )
}

$( 'p' ).forEach( _node => _node
    .classList.add( "red" , "bold" ) )
```
Naja, das ist schon etwas kürzer. Wenn wir aber Methoden und Eigenschaften nutzen wollen, werden wir nicht daran vorbei kommen, das Rückgabe Objekt in eine Klasse zu packen. Die Klasse nennen wir *selection*.

Das Grundgerüst:

```js
const $ = function ( selector = null ) {
  class selection {
    constructor( selector ) {
      if ( selector ) {
        this.nodes = document.querySelectorAll( selector )
      }
    }
  }
  return selector = new selection( selector )
};
```

rufen wie nun die Funktion nochmal auf:

```js
$( 'p' ).forEach( _node => _node
    .classList.add( "red" , "bold" ) )
```

Sofern die Developertools geöffnet sind, erhalten wir folgende Fehlermeldung auf der Konsole:  ```Uncaught TypeError: $(...).forEach is not a function```

Das bedeutet, dass das Objekt, die Funktion *forEach* nicht kennt. Egal, *forEach* gefällt mir sowieso nicht, nennen wir unsere Funktion einfach *each* und definieren Sie wie folgt:

```js
each = callback => ( this.nodes.
    forEach( _node => callback( _node ) ), this)
```

- *each* -> Funktionsname

- *callback* -> Funktion die auf jedes Element angewendet wird

- *_node* -> aktuelles Element

- *this* -> ist die *selection*, die zurückgegeben wird, um *Method Chaining*   anwenden zu können.

Diese Funktion in die Klasse eingefügt, ergibt folgende geänderte Javascript Datei.

```js
"use strict";
const $ = function ( selector = null ) {
  class selection {
    constructor( selector ) {
      if ( selector ) {
        this.nodes = document.querySelectorAll( selector )
      }
    }
    // iteriere durch NodeList
    each = callback => ( this.nodes.
      forEach( _node => callback( _node ) ), this)
  }
  return selector = new selection( selector )
};


$( 'p' ).each( _node => _node
    .classList.add( "red" , "bold" ) )
```

Beim Aufruf werden die Klassen wie gewünscht gesetzt. Das gewünschte Ziel: ```$( 'p' ).addClass( "red , bold" )``` ist allerdings noch nicht erreicht. 

Der Übergabeparameter sollte wie folgt definiert werden: ```" red , bold "```. Hierzu ist es erforderlich, diesen *string* jeweils am Komma zu splitten *split(',')* und die einzelnen Elemente des durch *split* zurückgegebenen Arrays von führenden und nachfolgenden Leerzeichen zu befreien mit der Funktion *trim()*. Danach wird dieses Array mit dem Rest Parameter *(...classes)* der Funktion *classList.add()* übergeben.  
  
Ein Beispiel hierzu:  

```js
let myClasses = " red , bold "
console.log( typeof myClasses ) //-> string

myClasses = myClasses.split( ',' )
console.log( typeof myClasses ) //-> object
console.log( myClasses ) //-> (2) [' red ', ' bold ']

myClasses = myClasses.map( _class => _class.trim() )
console.log( myClasses ) //-> (2) ['red', 'bold']

const test = ( ...classes ) => console.log( classes )

test( myClasses ) //-> [Array(2)]
```

Die Funktion *addClass* auf dieser Grundlage zusammengefasst und eingefügt:

```js
"use strict";
const $ = function ( selector = null ) {
  class selection {
    constructor( selector ) {
      if ( selector ) {
        this.nodes = document.querySelectorAll( selector )
      }
    }
    // iteriere durch NodeList
    each = callback => ( this.nodes.
      forEach( _node => callback( _node ) ), this)
  
    // setze eine oder mehrere Klassen
    // $('h1').addClass('red , blue')
  addClass = classes => this
    .each( _node =>
      _node.classList.add( ...classes.split( ',' )
      .map( _class => _class.trim() )))    
  
  }
  return selector = new selection( selector )
};
```

Damit wäre das erste Ziel erreicht:

```js
$( 'p' ).addClass( " red , bold " )
```

setzt wie gewünscht die Klassen. Nun ein Test ob *Method Chaining* auch funktioniert:

```js
$( "p" ).addClass( " red  " ).addClass(" bold ")
```

setzt ebenfalls die Klassen.

# Erweiterung der Library

Nachdem nun klar ist, wie die eigenen Funktionen deklariert werden, beschränke ich mich in diesem Kapitel auf die Darstellungen der einzelnen Funktionen und fasse diese jeweils am Ende des Artikels zusammen

## Klassen

### addClass

Die Methode *addClass* fügt die angegebenen Klassenwerte dem übergebenene Element hinzu.  
  
Aufruf: **```$( 'p' ).addClass( "red, bold" )```**

```js
  addClass = classes => this
    .each( _node =>
      _node.classList.add( ...classes.split( ',' )
      .map( _class => _class.trim() )))
```

### removeClass

Die Methode *removeClass* entfernt die angegebenen Klassenwerte vom übergebenen Element. 

Aufruf: **```$( 'p' ).removeClass( "red, bold" )```**

```js
  removeClass = classes => this
    .each( _node =>
      _node.classList.remove( ...classes.split( ',' )
      .map( _class => _class.trim() ))) 
```
Wir ersetzen hier lediglich die Methode *add* durch *remove*.

### replaceClass

Die Methode *replaceClass" ersetzt **einen** vorhandenen Klassenwert durch den übergebenen Klassenwert.

Aufruf: **```$( 'p' ).replaceClass( "red, bold" )```**

```js
  replaceClass = ( oldClass, newClass ) => this
    .each( _node =>
      _node.classList.replace( oldClass, newClass )) 
```
### toggleClass

Die Methode *toggleClass* schaltet den Klassenwert des übergebenen Elementes sozusagen an oder aus. Ist der Klassenwert vorhanden, wird dieser entfernt, ist er nicht vorhanden, wird der Klassenwert gesetzt.

```js
  toggleClass = ( _class ) => this
    .each( function ( _node ) {
      _node.classList.toggle( _class )})
```

### hasClass

Die Methode *hasClass* checkt ob das übergebene **erste** Element die als Parameter gesetzte Klasse besitzt und gibt dementsprechend *true* oder *false* zurück.

```js
    hasClass = _class => this.nodes[0]
      .classList.contains( _class )
```
  
Hier benötigen wir nur das erste Element der übergebenen *selection* also ```this.nodes[0]```.  

Da wir zukünfig sicher öfter dieses erste Element benötigen, ist es an der Zeit, dieses erste Element als Eigenschaft im *constructor* zu definieren.  
  
Diese Eigenschaft bezeichnen wir schlicht als *n* und definieren es wir folgt:

```js
this.n=this.nodes[0] 
```
womit der *constructor* wie folgt aussieht:  

```js
constructor( selector ) {
  if ( selector ) {
    this.nodes = document.querySelectorAll( selector )
    this.n=this.nodes[0] 
  }
}
```

und die Methode *hasClass* ändern wie zu:  
  
```js
hasClass = _class => this.n
  .classList.contains( _class )
```

### Zusammenfassung

der vorbeschriebenen Änderungen und Ergänzungen: 

```js
"use strict";
const $ = function ( selector = null ) {
  class selection {
    constructor( selector ) {
      if ( selector ) {
        this.nodes = document.querySelectorAll( selector )
        this.n=this.nodes[0] 
      }
    }  

    each = callback => ( this.nodes.
      forEach( _node => callback( _node ) ), this)
  
    addClass = classes => this
      .each( _node =>
        _node.classList.add( ...classes.split( ',' )
        .map( _class => _class.trim() )))
  
    removeClass = classes => this
      .each( _node =>
        _node.classList.remove( ...classes.split( ',' )
        .map( _class => _class.trim() ))) 
  
    replaceClass = ( oldClass, newClass ) => this
      .each( _node =>
      _node.classList.replace( oldClass, newClass ))
  
    toggleClass = ( _class ) => this
      .each( _node => 
      _node.classList.toggle( _class ))
  
    hasClass = _class => this.n
      .classList.contains( _class )
  
  }
  return selector = new selection ( selector )
};
```

### Test

**Zuweisung *selection* an Variable**

```js
"use strict";
  
let mySelection = $( 'p:first-of-type' )

mySelection
  .addClass( 'red' )
  .toggleClass( 'bold' )

console.log(
  mySelection.hasClass( 'red' ) // -> true
)

mySelection.removeClass( 'red' )

console.log(
  mySelection.hasClass( 'red' ) // -> false
)
```
**Übergabe eines Nodes aus *document.querySelector***

```js
"use strict";
  
let mySelection = document.querySelector( 'p' )

$(mySelection)
  .addClass( 'red' )
  .toggleClass( 'bold' )
``` 

Wie erwartet wird auf der Konsole folgender Fehler ausgegeben:  
  
```
Uncaught DOMException: 
Failed to execute 'querySelectorAll' on 'Document': 
'[object HTMLParagraphElement]' is not a valid selector.
```

Um dies zu heilen muss im *constructor* geprüft werden ob bereits ein Node übergeben wird. Hierzu ist der *ternäre* Operator hilfreich.  

```(selector.nodeType) ? [selector] : ```

*selector.nodeType* gibt *true* zurück wenn es sich bereits um einen Node handelt oder *false* wenn nicht. In diesem Fall ist *selector.nodeType* gleich *true* und wir müssen ihn nur noch in ein Objekt umwandeln mittels *[]*.

Ein Beispiel:

```js
let a = "string" 
console.log( typeof a) // -> string
let b = ["string"]
console.log( typeof b) // -> object
```

Der  *constructor* wird wie folgt erweitert:

```
constructor( selector ) {
  if ( selector ) {
    this.nodes = 
    ( selector.nodeType ) ? [selector] :  
    document.querySelectorAll( selector )
    this.n=this.nodes[0] 
  }
}
```

Der Test analog zum ersten Testlauf:

```js
"use strict";  

let mySelection = $( document.querySelector( "p:first-of-type" ) )

mySelection
  .addClass( 'red' )
  .toggleClass( 'bold' )

console.log(
  mySelection.hasClass( 'red' ) // -> true
)

mySelection.removeClass( 'red' )

console.log(
  mySelection.hasClass( 'red' ) // -> false
)
```

**Übergabe einer *Nodelist* aus *document.querySelectorAll***

```let mySelection = $( document.querySelectorAll( "p" ) )```

erzeugt nun folgende Fehlermeldung auf der Konsole:  

```
Uncaught DOMException: 
Failed to execute 'querySelectorAll' on 'Document': 
'[object NodeList]' is not a valid selector.
```

Der *constructor* muss nun dahingehend erweitert werden, dass auch eine *Nodelist* akzeptiert wird:  
  
```(NodeList.prototype.isPrototypeOf(selector)) ? selector : ```

womit sich der *constructor* wie folgt ändert:

```js
constructor( selector ) {
  if ( selector ) {
    this.nodes = 
    (selector.nodeType) ? [selector] : 
    (NodeList.prototype.isPrototypeOf(selector)) ? selector :
    document.querySelectorAll( selector )
    this.n=this.nodes[0] 
  }
}
```
Auch hier der Test:

```js
"use strict";  

let mySelection = $( document.querySelectorAll( "p" ) )

mySelection
  .addClass( 'red' )
  .toggleClass( 'bold' )

console.log(
  mySelection.hasClass( 'red' ) // -> true
)

mySelection.removeClass( 'red' )

console.log(
  mySelection.hasClass( 'red' ) // -> false
)
```
**Zusamenfassung**

die *library* nach Berücksichtigung der vorbeschrieben Änderungen:

```js
"use strict";
const $ = function ( selector = null ) {
  class selection {
    constructor( selector ) {
      if ( selector ) {
        this.nodes = 
        (selector.nodeType) ? [selector] : 
        (NodeList.prototype.isPrototypeOf(selector)) ? selector :
        document.querySelectorAll( selector )
        this.n=this.nodes[0] 
      }
    }
    // iteriere durch NodeList
    each = callback => ( this.nodes.
      forEach( _node => callback( _node ) ), this)
      
    // Klassen...(css)
    addClass = classes => this
      .each( _node =>
        _node.classList.add( ...classes.split( ',' )
        .map( _class => _class.trim() )))
  
    removeClass = classes => this
      .each( _node =>
        _node.classList.remove( ...classes.split( ',' )
        .map( _class => _class.trim() ))) 
  
    replaceClass = ( oldClass, newClass ) => this
      .each( _node =>
      _node.classList.replace( oldClass, newClass ))
  
    toggleClass = ( _class ) => this
      .each( _node => 
      _node.classList.toggle( _class ))
  
    hasClass = _class => this.n
      .classList.contains( _class )  
  }
  
  return selector = new selection ( selector )
};
```

## Content

Die Methode *html* **ersetzt** den HTML Content der übergebenen Nodes.

Aufruf: **```$( 'div' ).html( "<p>Lorem Ipsum..</p>" )```**

wird der Parameter *html* nicht angegeben, wird der HTML Inhalt zurückgegeben.

Aufruf: **```let divContent = $( 'div' ).html()```**

### html

```js
  html = html => {
    if (html){
      this.each( _node => _node.innerHTML = html)
      return this;
    } else {
      return this.n.innerHTML
    }
  }
```

Der Code vereinfacht durch den *ternären* Operator

```js
html = html => html 
    ? this.each( _node => _node.innerHTML = html)
    : this.n.innerHTML
```

Beispiel:

```html
<body>
  <h1>Test Selector</h1>
  
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <div></div> 
 
<script>
  "use strict";  

  $( 'div' ).html( "<p>Lorem Ipsum..</p>" )
  
  console.log( 
    $( 'div' ).html() 
    // -> <p>Lorem Ipsum..</p>
  )
</script>
</body>
</html>
```

Der Quelltext des Dokumentes wird durch vorhergehenden Aufruf geändert zu:  
  
```html
<body>
  <h1>Test Selector</h1>
  
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <div><p>Lorem Ipsum..</p></div> 
 
<script>...
```  

Diese *Methode* ist mit Vorsicht anzuwenden. Wie geschrieben **ersetzt** dieser Aufruf den vorhandenen HTML-Text.    
  
Nachfolgendes Beispiel verdeutlicht das eventuell entstehende Problem:  
  
```html
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>

  <div>
    <button>Klick mich!</button>
  </div> 
 
<script>
  "use strict";  
  // clickt man den Button wird folgende
  // Funktion aufgerufen
  const myClick = () => 
    console.log( 'Button click' )
  
  document.querySelector( 'button' )
    .addEventListener( 'click', myClick )

</script>
</body>
```

Will man das *div* um einen Absatz erweitern wäre folgende Vorgehensweise denkbar:  
  
```js
 "use strict";  
  // clickt man den Button wird folgende
  // Funktion aufgerufen
  const myClick = () => 
    console.log( 'Button click' )
  
  document.querySelector( 'button' )
    .addEventListener( 'click', myClick )

  let divHtml = $( 'div' ).html() 
  
  $( 'div' ).html( divHtml + "<p>Lorem Ipsum..</p>" )
```

Das Ergebnis sieht wie gewünscht aus:

```html
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <div>
    <button>Klick mich!</button>
    <p>Lorem Ipsum..</p>
  </div> 
```

Allerdings wurde bei dieser Aktion der auf dem Button liegende *Eventhandler* zerstört! 

Diese *Methode* sollte daher nur benutzt werden, wenn man neuen HTML-Inhalt einfügen also ersetzen will.

Folgende Methode ist eher geeignet, weil diese den übergebenen Text als HTML interpretiert und als Knoten an der angegebenen Position einfügt:

### insHtml

Aufruf: **```$( 'div' ).insHtml( "<p>Lorem Ipsum..</p>" )```** 

```js
insHtml = (html, pos="beforeend") =>
      this.each( _node => _node
        .insertAdjacentHTML( pos, html ))
```
Der Parameter *pos* darf einen der folgenden Werte annehmen:
- *beforebegin*
- *afterbegin*
- *beforeend* (default Einstellung)
- *afterend*

Die Auswirkungen der einzelnen Parameter:

Aufruf: **```$( 'div' ).insHtml( "<p>Lorem Ipsum..</p>", "beforebegin" )```**

```html
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <p>Lorem Ipsum..</p>
  <div>
    <button>Klick mich!</button>
  </div> 
</body>

```
Aufruf: **```$( 'div' ).insHtml( "<p>Lorem Ipsum..</p>", "afterbegin" )```**

```html
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <div>
    <p>Lorem Ipsum..</p>
    <button>Klick mich!</button>
  </div> 
```

Aufruf: **```$( 'div' ).insHtml( "<p>Lorem Ipsum..</p>", "beforeend" )```**

```html
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <div>
    <button>Klick mich!</button>
    <p>Lorem Ipsum..</p>
  </div> 

```

Aufruf: **```$( 'div' ).insHtml( "<p>Lorem Ipsum..</p>", "afterend" )```**

```html
<body>
  <h1>Test Selector</h1>
  <p>1 - Lorem ipsum dolor.</p>
  <p>2 - Lorem ipsum dolor.</p>
  <p>3 - Lorem ipsum dolor.</p>
  
  <div>
    <button>Klick mich!</button>
  </div>
  <p>Lorem Ipsum..</p> 
```

### text

Die Methode *text* **ersetzt** den Textinhalt der übergebenen Nodes.

Aufruf: **```$( 'h1' ).text( 'myHeader' )```**

wird der Parameter *text* nicht angegeben, wird der Text-Inhalt zurückgegeben.

Aufruf: **```let h1Text = $( 'h1' ).text()```**

```js
text = text => text
  ? this.each( _node => _node.innerText = text)
  : this.n.innerText
```

### Zusammenfassung

der vorbeschriebenen Änderungen und Ergänzungen: 

```js
"use strict";
const $ = function ( selector = null ) {
  class selection {
    constructor( selector ) {
      if ( selector ) {
        this.nodes = 
        (selector.nodeType) ? [selector] : 
        (NodeList.prototype.isPrototypeOf(selector)) ? selector :
        document.querySelectorAll( selector )
        this.n=this.nodes[0] 
      }
    }
    // iteriere durch NodeList
    each = callback => ( this.nodes.
      forEach( _node => callback( _node ) ), this)
      
    // Klassen...(css)
    addClass = classes => this
      .each( _node =>
        _node.classList.add( ...classes.split( ',' )
        .map( _class => _class.trim() )))
  
    removeClass = classes => this
      .each( _node =>
        _node.classList.remove( ...classes.split( ',' )
        .map( _class => _class.trim() ))) 
  
    replaceClass = ( oldClass, newClass ) => this
      .each( _node =>
      _node.classList.replace( oldClass, newClass ))
  
    toggleClass = ( _class ) => this
      .each( _node => 
      _node.classList.toggle( _class ))
  
    hasClass = _class => this.n
      .classList.contains( _class )  
  
    //Content 
    html = html => html 
      ? this.each( _node => _node.innerHTML = html)
      : this.n.innerHTML
  
  
    insHtml = (html, pos="beforeend") =>
      this.each( _node => _node
        .insertAdjacentHTML( pos, html ))
  
    text = text => text
      ? this.each( _node => _node.innerText = text)
      : this.n.innerText
}
  
  return selector = new selection ( selector )
};
```




## Nodes

### create

```js
    // erstellt ein leeres Element
    // und gibt dieses zurück
    // let newNode = $().create('h1')
  create = tag => $(document.createElement(tag))

```


### clone

```js
   // erstellt eine Kopie des übergebenen
    // Elementes und gibt diese zurück
    // $('p').clone().addClass('red')
    // .insertAfter($('p'))
  clone = () => $(this.n.cloneNode(true))

```


### append

```js
    // erstellt ein neues Element
    // fügt dieses Element an das Ende des 
    // übergebenene Elementes ein
    // und gibt dieses zurück
    // $('div').append('h3').text('new H3')
  append = tag => {
    let newEl = this.create(tag)
    this.n.appendChild(newEl.n)
    return newEl
  }

```


### appendEnd

```js
    // fügt Element an das Ende des 
    // übergebenene Elementes ein
    // und gibt dieses zurück
    // dummy=$().create('h2')
    // .text('new H2').appendEnd($('body'))
  appendEnd = _node => $(_node.n
    .appendChild(this.n)) 

```


### insertBefore

```js
    // fügt Element vor dem 
    // übergebenenen Element ein
    // und gibt dieses zurück
    // dummy=$().create('h1')
    //  .text('new H1')
    //  .insertBefore($('h2'))
  insertBefore = _node => (_node.n
    .before(this.n),this) 

```


### insertAfter

```js
    // fügt Element nach dem 
    // übergebenenen Element ein
    // und gibt dieses zurück
    // dummy=$().create('h2')
    //  .text('new H2')
    //  .insertAfter($('h1'))  
  insertAfter = _node => (_node.n
    .after(this.n),this)

```


### remove

```js
    // entfernt Element(e) aus dem DOM
    // $('p').remove() gibt nichts zurück
  remove = () => this
    .each(_node => _node.remove()) 

```


### parent

```js
    // gibt das Elternelement zurück
    // ist tag gesetzt, wird das nächste
    // elternelement mit dem angegebenen 
    // tag zurückgegeben
    // $('h1).parent() 
    // $('p').parent('div')
  parent = tag => {
    if (tag){
      return $(this.n.closest(tag))
    } else {
      return $(this.n.parentElement)
    }
  }  

```


### find

```js
    // gibt Elemente unterhalb des
    // 1. übergebenen Nodes zurück
    // $('.container').find('p')
  find = tag => $(this.n.querySelectorAll(tag))

```


### first

```js
    // gibt erstes Element zurück
    // $('p').first().addClass('red')
  first = () => $(this.n)

```


### last

```js
    // gibt letztes Element zurück
    // $('p').last().addClass('red')
  last = () => $(this.nodes[this.nodes.length-1])

```


### index

```js
    // gibt Element[index] zurück
    // $('p').index(1).addClass('red')
  index = index => $(this.nodes[index])

```


### exist

```js
    // check ob Element exisitiert
    // $('p').exist() -> true oder false
    // $('p').ok() -> true oder false
  exist = () => (this.nodes.length > 0) ? true : false

```


### ok

```js
    // check ob Element exisitiert
    // $('p').exist() -> true oder false
    // $('p').ok() -> true oder false
  ok = () => (this.nodes.length > 0) ? true : false

```


### Zusammenfassung


**wir noch erweitert... ist in Arbeit**
