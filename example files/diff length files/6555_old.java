File: org/jfree/chart/text/TextBox.java
Line: 394 402
Char: 10694 11083

private void writeObject(final ObjectOutputStream stream) throws IOException {
  stream.defaultWriteObject();
  SerialUtilities.writePaint(this.outlinePaint,stream);
  SerialUtilities.writeStroke(this.outlineStroke,stream);
  SerialUtilities.writePaint(this.backgroundPaint,stream);
  SerialUtilities.writePaint(this.shadowPaint,stream);
  SerialUtilities.writePaint(this.colorPaint,stream);
}
