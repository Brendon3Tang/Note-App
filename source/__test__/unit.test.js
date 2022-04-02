/**
 * @jest-environment jsdom
 */

// Unit Tests to run

import { createComp, addobj, getObjlist, getCounter, moveUp, moveDown, removeComp, reset} from '../Journal_Draft_v1/scripts/pagescript.js';

describe('pagescript.js', () => {
  describe('createComp:', () => {
    let hyperComp = createComp("hyperlink", '180px');
    let mapComp = createComp("map", '400px');
    let moodComp = createComp("moodbar", '110px');
    let todoComp = createComp("todo", '180px');
    let picComp = createComp("picture", '400px');
    let textComp = createComp("textbox", '220px');
    it('Create component', () => {
      expect(hyperComp).not.toBeUndefined();
      expect(mapComp).not.toBeUndefined();      
      expect(moodComp).not.toBeUndefined();
      expect(todoComp).not.toBeUndefined();
      expect(picComp).not.toBeUndefined();
      expect(textComp).not.toBeUndefined();
    })
    it('Name of component', () => {
      expect(hyperComp.id).toBe("hyperlink");
      expect(mapComp.id).toBe("map");
      expect(moodComp.id).toBe("moodbar");
      expect(todoComp.id).toBe("todo");
      expect(picComp.id).toBe("picture");
      expect(textComp.id).toBe("textbox");
    })
    it('Height of component', () => {
      expect(hyperComp.style.height).toBe('180px');
      expect(mapComp.style.height).toBe('400px');
      expect(moodComp.style.height).toBe('110px');
      expect(todoComp.style.height).toBe('180px');
      expect(picComp.style.height).toBe('400px');
      expect(textComp.style.height).toBe('220px');
    })
  })

  describe('addobj:', () => {
    let hyperObj = addobj("hyperlink", '180px');
    let mapObj = addobj("map", '400px');
    let moodObj = addobj("moodbar", '110px');
    let todoObj = addobj("todo", '180px');
    let picObj = addobj("picture", '400px');
    let textObj = addobj("textbox", '220px');
    it('Create object', () => {
      expect(hyperObj).not.toBeUndefined();
      expect(mapObj).not.toBeUndefined();
      expect(moodObj).not.toBeUndefined();
      expect(todoObj).not.toBeUndefined();
      expect(picObj).not.toBeUndefined();
      expect(textObj).not.toBeUndefined();
    })
    it('Name of object', () => {
      expect(hyperObj.id).toBe("hyperlink_0");
      expect(mapObj.id).toBe("map_1");
      expect(moodObj.id).toBe("moodbar_2");
      expect(todoObj.id).toBe("todo_3");
      expect(picObj.id).toBe("picture_4");
      expect(textObj.id).toBe("textbox_5");
    })
    it('Height of object', () => {
      expect(hyperObj.style.height).toBe('180px');
      expect(mapObj.style.height).toBe('400px');
      expect(moodObj.style.height).toBe('110px');
      expect(todoObj.style.height).toBe('180px');
      expect(picObj.style.height).toBe('400px');
      expect(textObj.style.height).toBe('220px');
    })
    it('ClassName of object', () => {
      expect(hyperObj.className).toBe('component');
      expect(mapObj.className).toBe('component');
      expect(moodObj.className).toBe('component');
      expect(todoObj.className).toBe('component');
      expect(picObj.className).toBe('component');
      expect(textObj.className).toBe('component');
    })
    it('Counter of objects', () => {
      expect(getCounter()).toBe(6);
    })
    it('Length of objlist', () => {
      expect(getObjlist().length).toBe(6);
    })      
    it('Order of objects', () => {
      let objl = getObjlist();
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('moodbar_2');
      expect(objl[3].id).toBe('todo_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('textbox_5');
    })
    it('Create duplicate object correctly', () => {
      let mood1Obj = addobj("moodbar", '110px');
      expect(mood1Obj).not.toBeUndefined();
      expect(mood1Obj.id).toBe('moodbar_6');
      expect(mood1Obj.style.height).toBe('110px');
      expect(mood1Obj.className).toBe('component');
    })
    it('List of objects is correct', () => {
      let objl = getObjlist();
      expect(getCounter()).toBe(7);
      expect(objl.length).toBe(7);
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('moodbar_2');
      expect(objl[3].id).toBe('todo_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('textbox_5');
      expect(objl[6].id).toBe('moodbar_6');
    })
    it('Fail to create duplicate TODO', () => {
      let todo1Obj = addobj("todo", '180px');
      expect(todo1Obj).toBeUndefined();
    })
    it('List of objects was not changed', () => {
      let objl = getObjlist();
      expect(getCounter()).toBe(7);
      expect(objl.length).toBe(7);
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('moodbar_2');
      expect(objl[3].id).toBe('todo_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('textbox_5');
      expect(objl[6].id).toBe('moodbar_6');
    })
  })

  describe('moveUp:', () => {
    it('Top', () => {
      let objl = getObjlist();
      moveUp(objl[0]);
      objl = getObjlist();
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('moodbar_2');
      expect(objl[3].id).toBe('todo_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('textbox_5');
      expect(objl[6].id).toBe('moodbar_6');
    })
    it('Mid', () => {
      let objl = getObjlist();
      moveUp(objl[3]);
      objl = getObjlist();
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('todo_2');
      expect(objl[3].id).toBe('moodbar_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('textbox_5');
      expect(objl[6].id).toBe('moodbar_6');
    })
    it('Bottom', () => {
      let objl = getObjlist();
      moveUp(objl[6]);
      objl = getObjlist();
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('todo_2');
      expect(objl[3].id).toBe('moodbar_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('moodbar_5');
      expect(objl[6].id).toBe('textbox_6');
    })
  })

  describe('moveDown:', () => {
    it('Bottom', () => {
      let objl = getObjlist();
      moveDown(objl[6]);
      objl = getObjlist();
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('todo_2');
      expect(objl[3].id).toBe('moodbar_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('moodbar_5');
      expect(objl[6].id).toBe('textbox_6');
    })
    it('Mid', () => {
      let objl = getObjlist();
      moveDown(objl[2]);
      objl = getObjlist();
      expect(objl[0].id).toBe('hyperlink_0');
      expect(objl[1].id).toBe('map_1');
      expect(objl[2].id).toBe('moodbar_2');
      expect(objl[3].id).toBe('todo_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('moodbar_5');
      expect(objl[6].id).toBe('textbox_6');
    })
    it('Top', () => {
      let objl = getObjlist();
      moveDown(objl[0]);
      objl = getObjlist();
      expect(objl[0].id).toBe('map_0');
      expect(objl[1].id).toBe('hyperlink_1');
      expect(objl[2].id).toBe('moodbar_2');
      expect(objl[3].id).toBe('todo_3');
      expect(objl[4].id).toBe('picture_4');
      expect(objl[5].id).toBe('moodbar_5');
      expect(objl[6].id).toBe('textbox_6');
    })
  })

  describe('removeComp:', () => {
    it('Remove mid', () => {
      let objl = getObjlist();
      removeComp(objl[2]);
      objl = getObjlist();
      expect(objl[0].id).toBe('map_0');
      expect(objl[1].id).toBe('hyperlink_1');
      expect(objl[2].id).toBe('todo_2');
      expect(objl[3].id).toBe('picture_3');
      expect(objl[4].id).toBe('moodbar_4');
      expect(objl[5].id).toBe('textbox_5');
    })
    it('Count correct', () => {
      expect(getCounter()).toBe(6);
    })
    it('Length of objlist', () => {
      expect(getObjlist().length).toBe(6);
    })
    it('Remove remaining', () => {
      let objl = getObjlist();
      removeComp(objl[0]);
      removeComp(objl[0]);
      removeComp(objl[0]);
      removeComp(objl[0]);
      removeComp(objl[0]);
      removeComp(objl[0]);
      objl = getObjlist();
      expect(objl).toEqual([]);
    })
    it('Count is 0', () => {
      expect(getCounter()).toBe(0);
    })
  })

  describe('reset:', () => {
    it('Populate list and reset', () => {
      let hyperObj = addobj("hyperlink", '180px');
      let mapObj = addobj("map", '400px');
      let moodObj = addobj("moodbar", '110px');
      expect(getCounter()).toBe(3);
      reset();
    })
    it('Counter and objlist is 1', () => {
      let objl = getObjlist();
      expect(objl.length).toBe(1);
      expect(getCounter()).toBe(1);
    })
    it('Object is textbox', () => {
      let objl = getObjlist();
      expect(objl[0].id).toBe('textbox_0');
    })    
  })
})

describe('jsCalendar.js:', () => {
  it('Has been imported so not testing', () => {
    expect(1).toBe(1);
  })
})

describe('home.js:', () => {
  it('Database functions, not unit tested', () => {
    expect(1).toBe(1);
  })
})

import { getDimmensions } from '../Journal_Draft_v1/components/picture/draw_script.js';

describe('Components:', () => {
  describe('Hyperlink:', () => {
    it('Nothing to test', () => {
      expect(1).toBe(1);
    })
  })
  
  describe('Map:', () => {
    it('Taken from Google API, so no test', () => {
      expect(1).toBe(1);
    })
  })
  
  describe('Moodbar:', () => {
    it('Nothing to test', () => {
      expect(1).toBe(1);
    })
  })
  
  describe('Picture:', () => {
    describe('draw_script/getDimmensions:', () => {
      it('Small square', () => {
        const dimensions = getDimmensions(400, 290, 50, 50);
        expect(dimensions.startX).toBe(55);
        expect(dimensions.startY).toBe(0);
        expect(dimensions.width).toBe(290);
        expect(dimensions.height).toBe(290);
      })      
      it('Big square', () => {
        const dimensions = getDimmensions(400, 290, 5000, 5000);
        expect(dimensions.startX).toBe(55);
        expect(dimensions.startY).toBe(0);
        expect(dimensions.width).toBe(290);
        expect(dimensions.height).toBe(290);
      })     
      it('Small Short Rectangle', () => {
        const dimensions = getDimmensions(400, 290, 250, 50);
        expect(dimensions.startX).toBe(0);
        expect(dimensions.startY).toBe(105);
        expect(dimensions.width).toBe(400);
        expect(dimensions.height).toBe(80);
      })          
      it('Big Short Rectangle', () => {
        const dimensions = getDimmensions(400, 290, 2500, 500);
        expect(dimensions.startX).toBe(0);
        expect(dimensions.startY).toBe(105);
        expect(dimensions.width).toBe(400);
        expect(dimensions.height).toBe(80);
      })      
      it('Small Tall Rectangle', () => {
        const dimensions = getDimmensions(400, 290, 50, 250);
        expect(dimensions.startX).toBe(171);
        expect(dimensions.startY).toBe(0);
        expect(dimensions.width).toBe(58);
        expect(dimensions.height).toBe(290);
      })      
      it('Big Tall Rectangle', () => {
        const dimensions = getDimmensions(400, 290, 500, 2500);
        expect(dimensions.startX).toBe(171);
        expect(dimensions.startY).toBe(0);
        expect(dimensions.width).toBe(58);
        expect(dimensions.height).toBe(290);
      })   
    })
  })
  
  describe('Todo:', () => {
    it('Nothing to test', () => {
      expect(1).toBe(1);
    })
  })

  describe('Textbox:', () => {
    it('Nothing to test', () => {
      expect(1).toBe(1);
    })
  })
})
