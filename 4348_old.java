File: org/jfree/chart/plot/PiePlot.java
Line: 1032 1062
Char: 37428 38421

protected Paint lookupSectionOutlinePaint(Comparable key,boolean autoPopulate){
  Paint result=getSectionOutlinePaint();
  if (result != null) {
    return result;
  }
  result=this.sectionOutlinePaintMap.getPaint(key);
  if (result != null) {
    return result;
  }
  if (autoPopulate) {
    DrawingSupplier ds=getDrawingSupplier();
    if (ds != null) {
      result=ds.getNextOutlinePaint();
      this.sectionOutlinePaintMap.put(key,result);
    }
 else {
      result=this.baseSectionOutlinePaint;
    }
  }
 else {
    result=this.baseSectionOutlinePaint;
  }
  return result;
}
