import React from 'react';
import { Money } from '@/types/shopify';
import { formatMoney } from '@/lib/formatting';
import { clsx } from 'clsx';

interface PriceProps {
  price: Money;
  compareAtPrice?: Money;
  size?: 'sm' | 'md' | 'lg';
  showCurrency?: boolean;
  className?: string;
}

const Price: React.FC<PriceProps> = ({
  price,
  compareAtPrice,
  size = 'md',
  showCurrency = true,
  className,
}) => {
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const discountPercentage = hasDiscount
    ? Math.round(
        ((parseFloat(compareAtPrice!.amount) - parseFloat(price.amount)) /
          parseFloat(compareAtPrice!.amount)) *
          100
      )
    : 0;

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Current Price */}
      <span className={clsx('font-semibold text-gray-900', sizeClasses[size])}>
        {formatMoney(price, showCurrency ? undefined : 'en-US')}
      </span>

      {/* Compare At Price (if discounted) */}
      {hasDiscount && (
        <>
          <span className={clsx('text-gray-500 line-through', sizeClasses[size])}>
            {formatMoney(compareAtPrice!, showCurrency ? undefined : 'en-US')}
          </span>
          
          {/* Discount Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            -{discountPercentage}%
          </span>
        </>
      )}
    </div>
  );
};

export default Price;
