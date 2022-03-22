"use strict";
const $ = function (t = null) {
    return new class {
      constructor(t) {
        t && (this.nodes = "document" === t ? [document] : "window" === t ? [window] : t.nodeType ? [t] : NodeList.prototype.isPrototypeOf(t) ? t : document.querySelectorAll(t), this.n = this.nodes[0])
      }
      each = t => (this.nodes.forEach((s => t(s))), this);
      addClass = t => this.each((s => s.classList.add(...t.split(",").map((t => t.trim())))), this);
      removeClass = t => this.each((s => s.classList.remove(...t.split(",").map((t => t.trim())))), this);
      replaceClass = (t, s) => this.each((e => e.classList.replace(t, s)));
      toggleClass = t => this.each((s => s.classList.toggle(t)));
      hasClass = t => this.n.classList.contains(t);
      html = t => t ? this.each((s => s.innerHTML = t)) : this.n.innerHTML;
      insHtml = (t, s = "beforeend") => this.each((e => e.insertAdjacentHTML(s, t)));
      text = t => t ? this.each((s => s.innerText = t)) : this.n.innerText;
      create = t => $(document.createElement(t));
      clone = () => $(this.n.cloneNode(!0));
      append = t => {
        let s = this.create(t);
        return this.n.appendChild(s.n), s
      };
      appendEnd = t => $(t.n.appendChild(this.n));
      insertBefore = t => (t.n.before(this.n), this);
      insertAfter = t => (t.n.after(this.n), this);
      remove = () => this.each((t => t.remove()));
      parent = t => $(t ? this.n.closest(t) : this.n.parentElement);
      find = t => $(this.n.querySelectorAll(t));
      first = () => $(this.n);
      last = () => $(this.nodes[this.nodes.length - 1]);
      index = t => $(this.nodes[t]);
      exist = () => this.nodes.length > 0;
      ok = () => this.nodes.length > 0;
      setAttr = (t, s = "") => this.each((e => e.setAttribute(t, s)), this);
      getAttr = t => this.n.getAttribute(t);
      removeAttr = t => this.each((s => s.removeAttribute(t)), this);
      hasAttr = t => this.n.hasAttribute(t);
      setData = (t, s) => this.each((e => e.dataset[t] = s), this);
      getData = t => this.n.dataset[t];
      removeData = t => this.each((s => delete s.dataset[t]), this);
      hasData = t => t in this.n.dataset;
      click = t => this.each((s => s.addEventListener("click", t)), this);
      removeClick = t => this.each((s => s.removeEventListener("click", t)), this);
      on = (t, s, e = null) => this.each((i => i.addEventListener(t, s, e)), this);
      removeOn = (t, s) => this.each((e => e.removeEventListener(t, s)), this);
      noDisplay = () => this.each((t => t.style.display = "none"), this);
      display = () => this.each((t => t.style.display = ""), this);
      watch = (t = null) => {
        let s = t => {
            t.dataset.filter && (t.value = window[t.dataset.filter](t.value)), t.dataset.source && $(`[data-target="${t.dataset.source}"]`).text(t.dataset.func ? window[t.dataset.func](t.value) : t.value)
          },
          e = (t = null, e) => {
            switch (null == t ? null : t.type) {
              case "input":
                s(e), "" == e.value && ($(`[data-target="${e.dataset.source}"]`).n.innerText = "");
                break;
              case "click":
                e.dataset.action && window[e.dataset.action](e, t), e.dataset.func && window[e.dataset.func](e, t);
                break;
              default:
                s(e)
            }
          };
        return $("[data-source]").each((t => e(null, t))), ["input", "click"].forEach((t => $(this.n).on(t, (t => (t => e(t, t.target))(t))))), t && t(), this
      };
      sCreate = t => {
        let s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return s.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), s.setAttribute("viewBox", t), $(s)
      };
      sAppend = t => (this.n.appendChild(t.n), this);
      svgtext = t => t ? (this.each((s => s.textContent = t)), this) : this.n.textContent;
      sC = t => document.createElementNS("http://www.w3.org/2000/svg", t);
      id = t => (this.setAttr("id", t), this);
      title = t => (this.setAttr("title", t), this);
      style = t => (this.setAttr("style", t), this);
      type = t => (this.setAttr("type", t), this);
      name = t => (this.setAttr("name", t), this);
      x = t => (this.setAttr("x", t), this);
      x1 = t => (this.setAttr("x1", t), this);
      x2 = t => (this.setAttr("x2", t), this);
      y = t => (this.setAttr("y", t), this);
      y1 = t => (this.setAttr("y1", t), this);
      y2 = t => (this.setAttr("y2", t), this);
      cx = t => (this.setAttr("cx", t), this);
      cy = t => (this.setAttr("cy", t), this);
      r = t => (this.setAttr("r", t), this);
      rx = t => (this.setAttr("rx", t), this);
      ry = t => (this.setAttr("ry", t), this);
      width = t => (this.setAttr("width", t), this);
      height = t => (this.setAttr("height", t), this);
      points = t => (this.setAttr("points", t), this);
      d = t => (this.setAttr("d", t), this);
      fill = t => (this.setAttr("fill", t), this);
      stroke = t => (this.setAttr("stroke", t), this);
      strokeWidth = t => (this.setAttr("stroke-width", t), this);
      dur = t => (this.setAttr("dur", t), this);
      path = t => (this.setAttr("path", t), this);
      repeatCount = t => (this.setAttr("repeatCount", t), this);
      href = t => (this.setAttr("href", t), this);
      textAnchor = t => (this.setAttr("text-anchor", t), this);
      dominantBaseline = t => (this.setAttr("dominant-baseline", t), this);
      sLine = (t, s, e, i) => $(this.sC("line")).x1(t).y1(s).x2(e).y2(i);
      sCircle = (t, s, e) => $(this.sC("circle")).cx(t).cy(s).r(e);
      sEllipse = (t, s, e, i) => $(this.sC("ellipse")).cx(t).cy(s).rx(e).ry(i);
      sRect = (t, s, e, i) => $(this.sC("rect")).x(t).y(s).width(e).height(i);
      sPolyline = t => $(this.sC("polyline")).points(t);
      sPolygon = t => $(this.sC("polygon")).points(t);
      sPath = t => $(this.sC("path")).d(t);
      sText = (t, s, e) => $(this.sC("text")).x(t).y(s).svgtext(e);
      sAnimateMotion = () => $(this.sC("animateMotion"));
      sMpath = () => $(this.sC("mpath"));
      sIcon = t => this.sCreate("0,0,32,32").sAppend($().sPath(t)).addClass("my-icon");
      sIconAction = t => this.setData("action", t).find("path").setData("action", t).parent()
    }(t)
  },
  csvToTable = async t => {
    try {
      const s = await fetch(t.dataset.csv, {
        method: "get",
        headers: {
          "content-type": "text/csv;charset=UTF-8"
        }
      });
      if (200 === s.status) {
        let e = (await s.text()).split("\n"),
          i = `<thead><tr><th>\n         ${e[0].replaceAll(";","<th>")}</tr></thead><tbody>`;
        e.shift(), e.forEach((t => {
          i += `<tr><td>${t.replaceAll(";","<td>")}</tr></tbody>`
        })), t.insertAdjacentHTML("afterBegin", i)
      } else console.log(`Error code ${s.status}`)
    } catch (t) {
      console.log(t)
    }
  };
