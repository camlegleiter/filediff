package pa4;
import java.util.*;
import java.io.*;

public class DataDistribution {

	private static boolean isUniform = false;
	private static boolean isBenford = false;
	private static double[] nums = new double[9];
	private static ArrayList<Integer> frequencies;

	public static int firstDigit(int num) {
		int numberToBeDivided = num;
		while (numberToBeDivided > 10) {
			numberToBeDivided = numberToBeDivided/10;
		}
		//returns number to be divided
		return numberToBeDivided;
	}

	public static ArrayList<Integer> firstDigitFrequencies(
			ArrayList<Integer> list) {
		ArrayList<Integer> numDigits = populateNumDigits();
		
		for (int i = 0; i < list.size(); i++) {
			int digit = firstDigit(list.get(i));
			int n = numDigits.get(digit - 1) + 1;
			numDigits.set(digit - 1, n);
		}
		frequencies = numDigits;
		return numDigits;
	}
	
	public static ArrayList<Integer> populateNumDigits()
	{
		ArrayList<Integer> numDigits = new ArrayList<Integer>();
		for (int i = 0; i < 10; i++) {
			numDigits.add(i, 0);
		}
		return numDigits;
	}

	public static double[] firstDigitPercentages(ArrayList<Integer> list) {
		ArrayList<Integer> numDigits = firstDigitFrequencies(list);
		double[] numDigitsDouble = new double[9];
		for (int i = 0; i < numDigitsDouble.length; i++) {
			double n = ((double) numDigits.get(i) / list.size()) * 100;
			numDigitsDouble[i] = (n);
		}

		return numDigitsDouble;
	}
	//Method to create Uniform Array
	public static double[] createUniformArray() {
		return new double[]{11.11, 11.11, 11.11, 11.11, 11.11, 11.11,11.11, 11.11, 11.11};
	}
	//Method to create the Benford Array
	public static double[] createBenfordArray() {
		return new double[]{ 30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1,4.6 };

	}

	
	public static boolean close(double[] a, double[] b) {
		if (a.length != b.length) {
			return false;
		}
		for (int i = 0; i < a.length; i++) {
			double remainder = Math.abs(a[i] - b[i]);
			if (remainder > 2.0) {
				return false;
			}
		}
		return true;
	}

	public static boolean isBenford(double[] d) {
		return close(d, createBenfordArray());
	}

	public static boolean isUniform(double[] d) {
		return close(d, createUniformArray());
	}

	public static ArrayList<Integer> readFromFile(String dataFile)
			throws FileNotFoundException {
		ArrayList<Integer> numbers = new ArrayList<Integer>();
		int[] numDigits = new int[9];
		File f = new File(dataFile);
		Scanner fileIn = new Scanner(f);
		while (fileIn.hasNextInt()) {
			int num = fileIn.nextInt();
			numbers.add(num);
		}
		fileIn.close();
		nums = firstDigitPercentages(numbers);
		return numbers;
	}

	public static void main(String[] args) throws FileNotFoundException {

		Scanner stdin = new Scanner(System.in);
		System.out.println("Enter the name of the file you would like to read in");
		String dataFile = stdin.next();
		readFromFile(dataFile);
		
		
		System.out.println("First Digit" + "        " + "Frequency" + "      " + "Percentage");
		for (int i = 0; i <nums.length; i++) {
		System.out.println("   " + (i + 1) + "        " + frequencies.get(i) + "     " + (nums[i]));
		}

		if (isUniform(nums)) {
			
			isUniform = isUniform(nums);
			System.out.println("Data obeys uniform law.");
			
		} else if (isBenford(nums)) {
			
			isBenford = isBenford(nums);
			System.out.println("Data obeys Benford law.");
			
		} else {
			
			System.out.println("Data obeys Neither law.");
		}

	}

}
