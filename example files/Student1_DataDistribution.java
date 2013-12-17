package PA4;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class DataDistribution {

	public static void main(String[] args) throws FileNotFoundException {

		Scanner stdin = new Scanner(System.in);
		System.out
				.println("Hello! please enter a file name containing a list of integers.");

		String dataFile = stdin.next();
		System.out.println("   First Digit   Frequency   Percentage");

		ArrayList<Integer> list = readFromFile(dataFile);
		double[] list2 = new double[9];

		for (int i = 0; i < 9; i++) {
			int firstDigit = i + 1;
			ArrayList<Integer> frequencies = firstDigitFrequencies(list);
			int freq = frequencies.get(i);
			list2[i] = firstDigitPercentages(list).get(i);

			System.out.print("\t" + firstDigit + "\t" + "      " + freq + "\t"
					+ "        ");
			System.out.printf("%.2f", list2[i]);
			System.out.println();
		}// end for

		boolean answer1 = isUniform(list2);
		boolean answer2 = isBenford(list2);

		if (answer1 == true) {
			System.out.println("Data obeys uniform law.");
		} else if (answer2 == true) {
			System.out.println("Data obeys benford law.");
		} else if (answer1 == false && answer2 == false) {
			System.out.println("Does not obey either law.");
		}
	}// end main

	public static int firstDigit(int num) { // singles out the first digit of
											// the number it brings in.
		while (num >= 10) {
			num = num / 10;
		}// end while

		return num;
	}// end firstDigit

	public static ArrayList<Integer> firstDigitFrequencies(
			ArrayList<Integer> list) {

		ArrayList<Integer> frequencies = new ArrayList<Integer>();
		int[] numFreq = new int[9];

		for (int i = 0; i < numFreq.length; i++) {
			for (int j = 0; j < numFreq.length; j++) {
				if (firstDigit(list.get(j)) == i + 1) {
					numFreq[i]++;
				}// end if
			}// end for
		}// end for

		for (int k = 0; k < 9; k++) {
			frequencies.add(numFreq[k]);
		}// end for

		return frequencies;
	}// end firstDigitFrequencies

	public static ArrayList<Double> firstDigitPercentages(
			ArrayList<Integer> list) {
		
		ArrayList<Double> percentage = new ArrayList<Double>();
		ArrayList<Integer> values=firstDigitFrequencies(list);
		double total = 0.0;
		
		for (int i = 0; i < 9; i++) {
			total += values.get(i);
		}// end for

		for (int j = 0; j < 9; j++) {
			double prct = values.get(j) / total;
			percentage.add(100 * prct);// turns the decimal into a percentage.
		}// end for

		return percentage;
	}// end firstDigitPercentages

	public static double[] createUniformArray() { // creates the uniform array
													// in which each element is
													// 11.11.
		double[] uniformArray = new double[9];
		for (int i = 0; i < uniformArray.length; i++) {
			uniformArray[i] = 11.11;
		}// end for

		return uniformArray;
	}// end createUniformArray

	public static double[] createBenfordArray() { // creates the benford array
													// using its given element
													// percentages.
		double[] benfordArray = new double[9];
		benfordArray[0] = 30.1;
		benfordArray[1] = 17.6;
		benfordArray[2] = 12.5;
		benfordArray[3] = 9.7;
		benfordArray[4] = 7.9;
		benfordArray[5] = 6.7;
		benfordArray[6] = 5.8;
		benfordArray[7] = 5.1;
		benfordArray[8] = 4.6;

		return benfordArray;
	}// end createBenfordArray

	public static boolean close(double[] a, double[] b) { // decides if the two
															// arrays of the
															// same length are
															// reasonably close.
		boolean accept = false;
		double[] differences = new double[9];

		if (!(a.length == b.length)) {
			accept = false;
		}// end if
		for (int i = 0; i < a.length; i++) {
			differences[i] = (Math.abs(a[i])) - (Math.abs(b[i]));
		}// end for
		for (int j = 0; j < a.length; j++) {
			if (differences[j] < 2) {
				accept = true;
			} else {
				accept = false;
				break;
			}
		}// end for

		return accept;
	}// end close

	public static boolean isUniform(double[] d) { // decides if the array taken
													// in matches a uniform
													// array.
		boolean answer = false;
		double[] uniformArray = createUniformArray();
		if (close(d, uniformArray) == true) {
			answer = true;
		}// end if
		if (close(d, uniformArray) != true) {
			answer = false;
		}// end if

		return answer;
	}// end isUniform

	public static boolean isBenford(double[] d) { // decides if the array taken
													// in matches a benford
													// array.
		boolean answer = false;
		double[] benfordArray = createBenfordArray();
		if (close(d, benfordArray) == true) {
			answer = true;
		}// end if

		if (close(d, benfordArray) != true) {
			answer = false;
		}// end if

		return answer;
	}// end isBenford

	public static ArrayList<Integer> readFromFile(String dataFile) // reads in
																	// integers
																	// from a
																	// user
																	// specified
																	// file.
			throws FileNotFoundException {
		File f = new File(dataFile);
		Scanner fileIn = new Scanner(f);
		ArrayList<Integer> list = new ArrayList<Integer>();

		while (fileIn.hasNextInt()) {
			int i = fileIn.nextInt();
			list.add(i);
		}// end while

		return list;
	}

}// end readFromFile
