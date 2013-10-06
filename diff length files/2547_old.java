File: org/jfree/chart/renderer/category/WaterfallBarRenderer.java
Line: 470 476
Char: 17443 17824

private void writeObject(ObjectOutputStream stream) throws IOException {
  stream.defaultWriteObject();
  SerialUtilities.writePaint(this.firstBarPaint,stream);
  SerialUtilities.writePaint(this.lastBarPaint,stream);
  SerialUtilities.writePaint(this.positiveBarPaint,stream);
  SerialUtilities.writePaint(this.negativeBarPaint,stream);
}
