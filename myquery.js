"use strict"; 
const $ = function (selector = null) {
 class selection {
  constructor(selector) {
   if (selector) {
    this.nodes =
     (selector === 'document') ? [document] :
     (selector === 'window') ? [window] :
     (selector.nodeType) ? [selector] :
     document.querySelectorAll(selector)
    this.n=this.nodes[0] 
   }
  }
  
    // iteriere durch NodeList
  each = callback => (this.nodes.
   forEach( _node => callback(_node)), this)

  /*****************/
  /**** Classes ****/
  /*****************/

    // setze eine oder mehrere Klassen
    // $('h1').addClass('red , blue')
  addClass = classes => this
    .each(function (_node) {
      _node.classList.add(...classes.split(',')
      .map(_class => _class.trim()))}, this)  
  
    // entfernt eine oder mehrere Klassen
    // $('h1').removeClass('red , blue')
  removeClass = classes => this
    .each(function (_node) {
      _node.classList.remove(...classes.split(',')
    .map(_class => _class.trim()))}, this)  
  
    // toggelt eine Klasse
    // $('h1').toggleClass('red )
  toggleClass = _class => this.
   each(function (_node) {
      _node.classList.toggle(_class)}, this) 
  
    // check ob Element eine bestimmte
    // Klasse besitzt
    // $('p').hasClass('red') -> true or false
  hasClass = _class => this.n.classList.contains(_class)

  /*****************/
  /**** Content ****/
  /*****************/
  
    // ersetzt HTML in Node oder 
    // gibt innerHTML zurück wenn (html) nicht übergeben wird
    // $('div').html('<h1>Test</h1>')
    // let dovContent = $('div').html()
  html = html => {
    if (html){
      this.each( _node => _node.innerHTML = html)
      return this;
    } else {
      return this.n.innerHTML
    }
  }
  
    // ersetzt innerText in Node oder 
    // gibt innerText zurück wenn (text) nicht übergeben wird
    // $('h1').text('myHeader')
    // let h1Text = $('h1').text()
  text = text => {
    if (text){
      this.each( _node => _node.innerText = text)
      return this;
    } else {
      return this.n.innerText
    }
  }

  /***************/
  /**** Nodes ****/
  /***************/
  
    // erstellt ein leeres Element
    // und gibt dieses zurück
    // let newNode = $().create('h1')
  create = tag => $(document.createElement(tag))
    
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
  
    // fügt Element an das Ende des 
    // übergebenene Elementes ein
    // und gibt dieses zurück
    // dummy=$().create('h2')
    //  .text('new H2').appendEnd($('body'))
  appendEnd = _node => $(_node.n
    .appendChild(this.n)) 
  
    // fügt Element vor dem 
    // übergebenenen Element ein
    // und gibt dieses zurück
    // dummy=$().create('h1')
    //  .text('new H1')
    //  .insertBefore($('h2'))
  insertBefore = _node => (_node.n
    .before(this.n),this) 
  
    // fügt Element nach dem 
    // übergebenenen Element ein
    // und gibt dieses zurück
    // dummy=$().create('h2')
    //  .text('new H2')
    //  .insertAfter($('h1'))  
  insertAfter = _node => (_node.n
    .after(this.n),this)
  
    // entfernt Element(e) aus dem DOM
    // $('p').remove() gibt nichts zurück
  remove = () => this
    .each(_node => _node.remove()) 
  
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
  
    // gibt erstes Element zurück
    // $('p').first().addClass('red')
  first = () => $(this.n)
  
    // gibt letztes Element zurück
    // $('p').last().addClass('red')
  last = () => $(this.nodes[this.nodes.length-1])
  
    // gibt Element[index] zurück
    // $('p').index(1).addClass('red')
  index = index => $(this.nodes[index])
  
    // check ob Element exisitiert
    // $('p').exist() -> true oder false
    // $('p').ok() -> true oder false
  exist = () => (this.nodes.length > 0) ? true : false
  ok = () => (this.nodes.length > 0) ? true : false

  /*******************/
  /**** Attribute ****/  
  /*******************/

  // setzt Attribute der Elemente
  // $('button').setAttribute(disabled)
  // $('input').setAttr('placeholder', 'my placeholder')
  setAttr = (key,value='') => this.each(_node => _node
    .setAttribute(key,value), this)
  
  // gibt Attribute des ersten Elements zurück
  // myAttribute = $('input').getAttr('placeholder)
  getAttr = att => this.n.getAttribute(att)
  
  // löscht Attribute der angegebenen Elemente
  // $('input').removeAttr('placeholder)
  removeAttr = att => this.each(_node => _node
    .removeAttribute(att), this)
  
  // check ob Element ein bestimmtes
  // Attribut besitzt
  // $('input').hasAttr('placeholder') -> true or false
  hasAttr = att => this.n.hasAttribute(att)
  
  /******************/
  /**** Datasets ****/  
  /******************/  
  
  // setzt Dataset der angegebenen Elemente 
  // $('button').setData('action', 'getArticles')
  setData = (key,value) => this.each(_node => _node
    .dataset[key]=value, this) 
  
  // gibt Dataset Wert des angegebenen 
  // Elementes zurück
  // $('button').getData('action')
  getData = key => this.n .dataset[key] 
  
  // löscht Dataset Wert der angegebenen 
  // Elemente und gibt diese zurück
  // $('button').removeData('action')
  removeData = key => this.each(_node => delete _node
    .dataset[key], this) 
  
  // check ob Element ein bestimmtes
  // Data Attribut besitzt
  // $('button').hasData('action') -> true or false
  hasData = att => att in this.n.dataset

  /****************/
  /**** events ****/  
  /****************/ 
  
  // bindet den EventListener 'click'
  // an die angegebenen Elemente,
  // führt nach Auslösung die
  // angegebene CallBack Function aus
  // und gibt Elemente zurück
  // $('button').click(doSomething)
  click = callBack => this.each(_node => _node
    .addEventListener('click', callBack),this)
  
  // löscht den EventListener 'click'
  // der angegebenen Elemente.
  // Achtung keine anonymen Funktionen
  // verwenden!!
  // $('button').removeClick(doSomething)
  removeClick = callBack => this
    .each(_node => _node
    .removeEventListener('click', callBack),this)
  
  // bindet den EventListener 'event'
  // an die angegebenen Elemente,
  // führt nach Auslösung die
  // angegebene CallBack Function aus
  // und gibt Elemente zurück
  // $('button').on('click', doSomething)
  on = (evt,callBack, options=null) => this
    .each(_node => _node
    .addEventListener(evt, callBack, options), this)
  
  // löscht den EventListener 'evt'
  // der angegebenen Elemente.
  // Achtung keine anonymen Funktionen
  // verwenden!!
  // $('button').removeOn(doSomething)
  removeOn = (evt,callBack) => this
    .each(_node => _node
    .removeEventListener(evt, callBack), this)

  /****************/
  /**** styles ****/  
  /****************/   
  
  // hier sollte man nicht mehr Eigenschaften 
  // anwenden, der Weg über Klassen ist besser.
  // zeigt angegebene Elemente nicht mehr an
  // $('p').noDisplay()
  noDisplay = () => this.each(_node => _node
    .style.display='none', this)
  
  // zeigt angegebeneElemente an
  // $('p').display()
  display = () => this.each(_node => _node
    .style.display='', this)

  /***************/
  /**** watch ****/  
  /***************/
  
    //überwacht click und input events des übergebenen Elements
    /*
    <input data-source=message 
      data-filter=inputInt 
      data-func=inputToHex 
      type=text>
    <p>Ergebnis Hex: <b><span data-target=message></span></b></p>
    <button data-action=clickButton>test</button>
    <button data-action=clickButton1>test1</button>
      // bitte beachten, dass die Funktionen vor
      // Aufruf von watch deklariert werden
    "use strict";
    var clickButton = _node => console.log(_node)
    var clickButton1 = _node => console.log($(_node).text())
    var inputToHex = t => t ? new Number(t).toString(16): ''
    var inputInt = t => t.replace(/[^0-9]/g, '')
    $('body').watch()   
    */
  watch = (callBack=null) => {
    
    let handleEvents = evt => handleValues(evt, evt.target)
  
    let fillValues = _node => {
      
      if (_node.dataset.filter)
        _node.value = window[_node.dataset.filter](_node.value)
      
      
      if (_node.dataset.source)
        $(`[data-target="${_node.dataset.source}"]`)
          .text(_node.dataset.func ? 
          window[_node.dataset.func](_node.value) : 
          _node.value)
    
    }
  
    let handleValues = (evt=null, _node) => {
      switch ((evt == null) ? null : evt.type){
        
        case 'input':
          fillValues(_node)
          if(_node.value==''){
            $(`[data-target="${_node.dataset.source}"]`).n.innerText=''
          }
          break;
        
        case 'click':
          if (_node.dataset.action) 
            window[_node.dataset.action](_node,evt)
          if (_node.dataset.func) 
            window[_node.dataset.func](_node,evt)
          break;
        
        default:             
          fillValues(_node)
      }
    }
        
    $(`[data-source]`).each(
      _node=>handleValues(null, _node));

    ['input', 'click'].forEach( evt => 
        $(this.n).on(evt, _evt => handleEvents(_evt)))

    if (callBack) callBack()

    return this
  }
  /*************/
  /**** SVG ****/  
  /*************/

    sCreate = (viewBox) => {
      let mySVG = document.createElementNS(
        "http://www.w3.org/2000/svg", "svg")
      mySVG.setAttributeNS("http://www.w3.org/2000/xmlns/", 
        "xmlns:xlink", "http://www.w3.org/1999/xlink")
      mySVG.setAttribute('viewBox', viewBox)
      return $(mySVG)
    }
    
    sAppend = n => (this.n.appendChild(n.n), this)
  
    svgtext = text => {
    if (text){
      this.each( _node => _node.textContent = text)
      return this;
    } else {
      return this.n.textContent
    }
  }
    
    sC= el => document.createElementNS("http://www.w3.org/2000/svg", el)
    
    sLine = (x1,y1,x2,y2) => 
      $(this.sC('line')).setAttr('x1',x1).setAttr('y1',y1)
        .setAttr('x2',x2).setAttr('y2',y2)
      
    sCircle = (cx,cy,r) => 
      $(this.sC('circle')).setAttr('cx',cx).
        setAttr('cy',cy).setAttr('r',r)
  
    sEllipse = (cx,cy,rx, ry) => 
      $(this.sC('ellipse')).setAttr('cx',cx).
        setAttr('cy',cy).setAttr('rx',rx)
        .setAttr('ry',ry)
      
    sRect = (x,y,width,height) => 
      $(this.sC('rect')).setAttr('x',x).setAttr('y',y)
        .setAttr('width',width).setAttr('height',height)
  
    sPolyline = points => $(this.sC('polyline')).setAttr('points',points)
    
    sPolygon = points => $(this.sC('polygon')).setAttr('points',points)
    
    sPath = path => $(this.sC('path')).setAttr('d',path)
  
    sText = (x,y,text) => $(this.sC('text')).setAttr('x',x)
      .setAttr('y',y).svgtext(text)

 }
 return selector = new selection(selector)
};
