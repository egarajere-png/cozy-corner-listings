import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MortgageCalculatorProps {
  propertyPrice: string;
}

// Parse price string like "KSh 45,000,000" to number
const parsePrice = (priceStr: string): number => {
  const numbers = priceStr.replace(/[^0-9]/g, "");
  return parseInt(numbers, 10) || 0;
};

// Format number to currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const MortgageCalculator = ({ propertyPrice }: MortgageCalculatorProps) => {
  const basePrice = parsePrice(propertyPrice);
  
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTermYears, setLoanTermYears] = useState(20);

  const calculations = useMemo(() => {
    const downPayment = (basePrice * downPaymentPercent) / 100;
    const loanAmount = basePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    let monthlyPayment = 0;
    if (monthlyInterestRate > 0) {
      const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      monthlyPayment = loanAmount * (monthlyInterestRate * factor) / (factor - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      downPayment,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  }, [basePrice, downPaymentPercent, interestRate, loanTermYears]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-smoky-2 p-6 lg:p-8 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h3 className="title-1 !mb-0">Mortgage Calculator</h3>
      </div>

      <div className="space-y-6">
        {/* Property Price Display */}
        <div className="p-4 bg-eerie-1 border border-white/10">
          <p className="text-muted-foreground text-sm mb-1">Property Price</p>
          <p className="text-2xl font-forum text-primary">{propertyPrice}</p>
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Down Payment</Label>
            <span className="text-primary font-medium">{downPaymentPercent}%</span>
          </div>
          <Slider
            value={[downPaymentPercent]}
            onValueChange={(value) => setDownPaymentPercent(value[0])}
            min={5}
            max={50}
            step={5}
            className="py-2"
          />
          <p className="text-sm text-muted-foreground">
            {formatCurrency(calculations.downPayment)}
          </p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Interest Rate (Annual)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={1}
                max={30}
                step={0.5}
                className="w-20 h-8 text-right bg-eerie-1 border-white/10"
              />
              <span className="text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            min={1}
            max={25}
            step={0.5}
            className="py-2"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Loan Term</Label>
            <span className="text-primary font-medium">{loanTermYears} years</span>
          </div>
          <Slider
            value={[loanTermYears]}
            onValueChange={(value) => setLoanTermYears(value[0])}
            min={5}
            max={30}
            step={5}
            className="py-2"
          />
        </div>

        {/* Results */}
        <div className="border-t border-white/10 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Loan Amount</span>
            <span className="font-medium">{formatCurrency(calculations.loanAmount)}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-primary/10 border border-primary/30">
            <span className="font-bold">Monthly Payment</span>
            <span className="text-2xl font-forum text-primary">
              {formatCurrency(calculations.monthlyPayment)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="font-medium text-muted-foreground">
              {formatCurrency(calculations.totalInterest)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Payment</span>
            <span className="font-medium">{formatCurrency(calculations.totalPayment)}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-eerie-1 border border-white/10 text-xs text-muted-foreground">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            This calculator provides estimates only. Actual rates and payments may vary. 
            Contact us for personalized financing options.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
