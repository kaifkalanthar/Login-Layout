import { cva } from 'class-variance-authority';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import type { MergeExclusive } from 'type-fest';

export const textVariants = {
  size: {
    '2xl': 'text-[48px] leading-[56px]',
    xl:   'text-[32px] leading-[40px]',
    lg:   'text-[24px] leading-[32px]',
    md:   'text-[16px] leading-[24px]',
    sm:   'text-[12px] leading-[16px]',
    xs:   'text-[8px]  leading-[12px]',
  },
  weight: {
    bold:    'font-bold',
    medium:  'font-medium',
    semibold: 'font-semibold',
    regular: 'font-normal',
    italic:  'italic font-normal',
  },
  subdued: {
    true: 'text-gray-8',
  },
};

const textStyles = cva([], {
  variants: textVariants,
  defaultVariants: {
    size: 'md',
    subdued: false,
    weight: 'regular',
  },
});

type Size = keyof typeof textVariants.size;
type Weight = keyof typeof textVariants.weight;
export type TextVariant = `${Size}-${Weight}`;

export const generateTextStyleVariants = (): TextVariant[] => {
  const sizes = Object.keys(textVariants.size) as Size[];
  const weights = Object.keys(textVariants.weight) as Weight[];
  return sizes.flatMap((size) =>
    weights.map((weight) => `${size}-${weight}` as TextVariant)
  );
};

export type TextStyleProps = {
  /** @default 'p' */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  className?: string;

  /** @default 'md-regular' */
  variant?: TextVariant;

  /** @default false */
  subdued?: boolean;

  title?: string;

  ref?: ForwardedRef<HTMLParagraphElement>;
} & MergeExclusive<
  {
    html: string | TrustedHTML;
  },
  {
    children: ReactNode;
  }
>;

export const TextStyle = forwardRef(
  (props: TextStyleProps, ref: ForwardedRef<HTMLParagraphElement>) => {
    const {
      title,
      children,
      className,
      subdued = false,
      as: Tag = 'p',
      variant = 'md-regular',
      html,
    } = props;
    const [size, weight] = variant.split('-') as [Size, Weight];

    if (html) {
      return (
        <Tag
          className={textStyles({ size, weight, subdued, className })}
          title={title}
          dangerouslySetInnerHTML={{ __html: html }}
          ref={ref}
        />
      );
    }

    return (
      <Tag
        className={textStyles({ size, weight, subdued, className })}
        title={title}
        ref={ref}
      >
        {children}
      </Tag>
    );
  }
);

TextStyle.displayName = 'TextStyle';
