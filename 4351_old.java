File: org/jfree/chart/plot/PiePlot.java
Line: 1206 1236
Char: 43452 44456

protected Stroke lookupSectionOutlineStroke(Comparable key,boolean autoPopulate){
  Stroke result=getSectionOutlineStroke();
  if (result != null) {
    return result;
  }
  result=this.sectionOutlineStrokeMap.getStroke(key);
  if (result != null) {
    return result;
  }
  if (autoPopulate) {
    DrawingSupplier ds=getDrawingSupplier();
    if (ds != null) {
      result=ds.getNextOutlineStroke();
      this.sectionOutlineStrokeMap.put(key,result);
    }
 else {
      result=this.baseSectionOutlineStroke;
    }
  }
 else {
    result=this.baseSectionOutlineStroke;
  }
  return result;
}
