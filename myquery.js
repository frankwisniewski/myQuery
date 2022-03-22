"use strict"; 
const $ = function (selector = null) {
 class selection {
  constructor(selector) {
   if (selector) {
    this.nodes =
     (selector === 'document') ? [document] :
     (selector === 'window') ? [window] :
     (selector.nodeType) ? [selector] :
     (NodeList.prototype.isPrototypeOf(selector)) ? selector :
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
    .each( _node =>
      _node.classList.add(...classes.split(',')
      .map(_class => _class.trim())), this)  
  
    // entfernt eine oder mehrere Klassen
    // $('h1').removeClass('red , blue')
  removeClass = classes => this
    .each( _node =>
      _node.classList.remove(...classes.split(',')
    .map(_class => _class.trim())), this) 
  
    // ersetzt eine Klassen
    // $('h1').replaceClass('red , blue')
  replaceClass = (class1, class2) => this
    .each( _node =>
      _node.classList.replace(class1,class2)) 
  
  
    // toggelt eine Klasse
    // $('h1').toggleClass('red')
  toggleClass = ( _class ) => this
      .each( _node => 
      _node.classList.toggle( _class ))
  
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
  html = html => html 
    ? this.each( _node => _node.innerHTML = html)
    : this.n.innerHTML
  
    // ergänzt html in angegebenen Nodes
    // an folgenden Positionen
    // - beforebegin
    // - afterbegin
    // - beforeend (default Einstellung)
    // - afterend
    // $( 'div' ).insHtml( "<p>Lorem Ipsum..</p>", "afterbegin" )
  insHtml = (html, pos="beforeend") =>
    this.each( _node => _node
      .insertAdjacentHTML( pos, html ))

    // ersetzt innerText in Node oder 
    // gibt innerText zurück wenn (text) nicht übergeben wird
    // $('h1').text('myHeader')
    // let h1Text = $('h1').text()
  text = text => text
    ? this.each( _node => _node.innerText = text)
    : this.n.innerText

  /***************/
  /**** Nodes ****/
  /***************/
  
    // erstellt ein leeres Element
    // und gibt dieses zurück
    // let newNode = $().create('h1')
  create = tag => $(document.createElement(tag))
    
    // erstellt eine Kopie des übergebenen
    // Elementes und gibt diese zurück
    // $('p').clone().addClass('red')
    // .insertAfter($('p'))
  clone = () => $(this.n.cloneNode(true))
    
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
    // .text('new H2').appendEnd($('body'))
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
    // gibt Elemente unterhalb des
    // 1. übergebenen Nodes zurück
    // $('.container').find('p')
  find = tag => $(this.n.querySelectorAll(tag))
                  
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
  /* 
    $().sCreate('0,0,100,100').id('mySVG')
    .fill('none').stroke('black')
    .sAppend($().sPath('M 10,10 L 90,10 90,90 10,90 Z').id('myPath'))
    .sAppend($().sCircle(0,0,7).id('myCircle')
      .fill('white')
      .sAppend($().sAnimateMotion()
        .dur('23s')
        //.path('M 10,10 L 90,10 90,90 10,90 Z')
        .repeatCount('indefinite')
        .sAppend(
          $().sMpath().href('#myPath')
        )       
      )
    ).insertAfter($('body h1'))
  */
  sCreate = (viewBox) => {
    let mySVG = document.createElementNS(
      "http://www.w3.org/2000/svg", "svg")
    mySVG.setAttributeNS("http://www.w3.org/2000/xmlns/", 
      "xmlns:xlink", "http://www.w3.org/1999/xlink")
    mySVG.setAttribute('viewBox', viewBox)
    return $(mySVG)
  }
  // fügt angegebenes Element als Child ein
  // gibt aber das Ursprungselement zurück
  // $(mySVG).sAppend($()
  //    .sPath('M 10,10 L 90,10 90,90 10,90 Z')
  //    .id('myPath'))
  sAppend = n => (this.n.appendChild(n.n), this)
  
  svgtext = text => {
    if (text){
      this.each( _node => _node.textContent = text)
      return this;
    } else {
      return this.n.textContent
    }
  }
  // Hilfsfunction  zur Erstellung der SVG Elemente
  // $(this.sC('line')).x1(x1).y1(y1).x2(x2).y2(y2)  
  sC= el => document.createElementNS("http://www.w3.org/2000/svg", el)
  
  /*** direkte Attribute ***/  
  //$('svg').id('mySVG')
  id = id => (this.setAttr('id', id),this)
  title = title => (this.setAttr('title', title),this)
  style = style => (this.setAttr('style', style),this)
  type = type => (this.setAttr('type', type),this)
  name = name => (this.setAttr('name', name),this)
  x = x => (this.setAttr('x', x),this)
  x1 = x1 => (this.setAttr('x1', x1),this)
  x2 = x2 => (this.setAttr('x2', x2),this)
  y = y => (this.setAttr('y', y),this)
  y1 = y1 => (this.setAttr('y1', y1),this)
  y2 = y2 => (this.setAttr('y2', y2),this)
  cx = cx => (this.setAttr('cx', cx),this)
  cy = cy => (this.setAttr('cy', cy),this)
  r = r => (this.setAttr('r', r),this)
  rx = rx => (this.setAttr('rx', rx),this)
  ry = ry => (this.setAttr('ry', ry),this)
  width = width => (this.setAttr('width', width),this)
  height = height => (this.setAttr('height', height),this)
  points = points => (this.setAttr('points', points),this)
  d = d => (this.setAttr('d', d),this)
  fill = fill => (this.setAttr('fill', fill),this)
  stroke = stroke => (this.setAttr('stroke', stroke),this)
  strokeWidth = strokeWidth => (this.setAttr('stroke-width', strokeWidth),this)
  dur = dur => (this.setAttr('dur', dur),this)
  path = path => (this.setAttr('path', path),this)
  repeatCount = repeatCount => (this.setAttr('repeatCount', repeatCount),this)
  href = href => (this.setAttr('href', href),this)
  textAnchor = textAnchor => (this.setAttr('text-anchor', textAnchor),this)
  dominantBaseline = dominantBaseline => (this.setAttr('dominant-baseline', dominantBaseline),this)
  /**** Elemente ****/
  // erstellt neues SVG Element und gibt dieses zurück
  //($(mySVG).sAppend($().sPath('M 10,10 L 90,10 90,90 10,90 Z').id('myPath'))
  sLine = (x1,y1,x2,y2) => $(this.sC('line')).x1(x1).y1(y1).x2(x2).y2(y2)  
  sCircle = (cx,cy,r) => $(this.sC('circle')).cx(cx).cy(cy).r(r)
  sEllipse = (cx,cy,rx, ry) => $(this.sC('ellipse')).cx(cx).cy(cy).rx(rx).ry(ry)
  sRect = (x,y,width,height) => $(this.sC('rect')).x(x).y(y).width(width).height(height)
  sPolyline = points => $(this.sC('polyline')).points(points)
  sPolygon = points => $(this.sC('polygon')).points(points)
  sPath = path => $(this.sC('path')).d(path)
  sText = (x,y,text) => $(this.sC('text')).x(x).y(y).svgtext(text)
  
  /*** Animationen ***/
  sAnimateMotion = () => $(this.sC('animateMotion'))
  sMpath = () => $(this.sC('mpath'))
  /********* create Icon ************/
  // erstellt ein Icon in der Größe 32 x 32 px
  // übergeben wird der Pfad d ('M 10,10 ....')
  //const iconEnvelope = $().sIcon('M 3 8 L 3 26 L 29 26 L 29 8 Z M 7.3125 10 L 24.6875 10 L 16 15.78125 Z M 5 10.875 L 15.4375 17.84375 L 16 18.1875 L 16.5625 17.84375 L 27 10.875 L 27 24 L 5 24 Z')

  sIcon = (path) => this.sCreate('0,0,32,32').sAppend($().sPath(path)).addClass('my-icon')
  sIconAction = (action) => 
      this.setData('action', action)
        .find('path').setData('action', action).parent()

 }
 return selector = new selection(selector)
};

/******************/
/*** some Tools ***/
/******************/

const csvToTable = async (tableElement) => {
  try {        
      const req = await fetch(tableElement.dataset.csv, {
        method: 'get',
        headers: {
          'content-type': 'text/csv;charset=UTF-8'}
      });
      if (req.status === 200) {
        const csv = await req.text();
        let myTableArray = csv.split('\n')
        let myTable=`<thead><tr><th>
         ${myTableArray[0].replaceAll(';',
        '<th>')}</tr></thead><tbody>`
        myTableArray.shift()
        myTableArray.forEach((aktRow) => {
        myTable+=`<tr><td>${aktRow.replaceAll(
        ';','<td>')}</tr></tbody>`})
        tableElement.
         insertAdjacentHTML('afterBegin', myTable)
      } else {
        console.log(`Error code ${req.status}`);
      }
  } catch (err) {console.log(err)}
} 
