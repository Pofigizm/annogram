/* jshint devel:true */
'use strict';

var a10r = {
  generate: function(array) {
    // функция сравнения для сортировки
    var _compater = function(a, b){
      if ( a < b ) return -1;
      if ( a > b ) return 1;
      return 0;
    };
    // преобразует обьект к масиву значений
    var _getValue = function(object){
      return Object.keys(object)
        .map(function(key){
          return object[key];
        });
    };

    return _getValue( 
      array
      // преобразуем масив строк к масиву обьектов с 'hash'    
      .map(function(el){
        return {
          value: el,
          hash: el.split('').sort(_compater).join('')
        };
      })
      // собираем в один обьект с ключами 'hash'
      .reduce(function(pe, ce){
        var arr = pe[ce.hash] || [];
        pe[ce.hash] = arr.concat([ce.value]);
        return pe;
      }, {})
    )
    // убираем повторные слова в массивах аннограмм
    .map(function(el){
      return Object.keys(
        el.reduce(function(pe, ce){
          pe[ce] = 'str';
          return pe;
        }, {})
      );
    })
    // оставляем масивы длиной больше 1 элемента 
    .filter(function(el){
      return el.length > 1;
    });
  },
  parse: function(string){
    return string
      .replace(/[,;]/g, ' ')
      .replace(/[^А-Яа-я\s]/g, '')
      .split(' ')
      .filter(function(el){
        return el.length > 0;
      });
  },
  domList: function(array){
    var list = document.createElement('ul');
    array.forEach(function(arr){
      var elem = document.createElement('li');
      elem.textContent = arr.join(' - ');
      list.appendChild(elem);
    });
    return list;
  },
  draw: function(string){
    var res = this.generate(this.parse(string));
    result.replaceChild(this.domList(res), result.childNodes[0]);
  }
};

insert.addEventListener('keyup', (function(){
  var timer; 
  return function(e){
    clearTimeout(timer);
    timer = setTimeout(function(){
      a10r.draw(e.target.value);
    }, 500);
  }  
})());

a10r.draw(insert.textContent);
