'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useReady } from '@/app/hooks/useReady';

function ClutchCardSm() {
  return (
    <span className="block h-[46px] w-[99px] shrink-0 bg-[url('/brand/clutch-card.svg')] bg-[length:100%_100%] bg-no-repeat">
      <span className="flex flex-col items-center gap-1 pt-[7px] normal-case">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/clutch-logo.svg" alt="Clutch" width={49} height={14} />
        <span className="flex items-center gap-1 text-[12px] leading-[1.17] whitespace-nowrap">
          <span className="font-semibold">12</span>
          <span className="font-normal">reviews</span>
        </span>
      </span>
    </span>
  );
}

function ClutchCardLg() {
  return (
    <span className="block h-16 w-[118px] shrink-0 bg-[url('/brand/clutch-card-lg.svg')] bg-[length:100%_100%] bg-no-repeat">
      <span className="flex flex-col items-center gap-1.5 pt-[13px] normal-case">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/clutch-logo.svg" alt="Clutch" width={68} height={19} />
        <span className="flex items-center gap-1 text-[12px] leading-[1.17] whitespace-nowrap">
          <span className="font-semibold">12</span>
          <span className="font-normal">reviews</span>
        </span>
      </span>
    </span>
  );
}

const EASE = [0.22, 0.8, 0.24, 1] as const;

function Rise({
  delay,
  ready,
  className,
  children,
}: {
  delay: number;
  ready: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex overflow-hidden align-middle leading-none">
      <motion.span
        className={`inline-flex leading-none${className ? ` ${className}` : ''}`}
        initial={{ y: '100%' }}
        animate={{ y: ready ? '0%' : '100%' }}
        transition={{ duration: 0.9, ease: EASE, delay: delay / 1000 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ready = useReady();

  return (
    <section className="mx-auto flex flex-col gap-8 px-4 pt-5 tab:px-6 tab:pt-6 lg:gap-[46px] lg:p-8 2xl:max-w-[1512px]">
      <div className="flex flex-col gap-5 tab:gap-9">
        <div className="flex items-center gap-5">
          <div className="inline-flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/title-icon.svg" alt="" aria-hidden width={44} height={44} className="shrink-0" />
            <div className="flex h-11 items-center rounded-full border border-brand-light-blue px-[26px] text-sm leading-[1.43] font-medium text-brand-dark">
              Our Stories
            </div>
          </div>
          <div className="h-px flex-1 bg-brand-light-blue" />
        </div>

        {/* Headline: < 768 */}
        <div className="text-[46px] leading-[1.174] font-medium uppercase text-brand-dark tab:hidden">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <Rise delay={80} ready={ready}>
              We
            </Rise>
            <Rise
              delay={200}
              ready={ready}
              className="bg-[url('/brand/accent-union.svg')] bg-[length:100%_100%] bg-no-repeat px-3 py-1 text-brand-blue"
            >
              create
            </Rise>
            <Rise delay={320} ready={ready}>
              digital solutions that set the
            </Rise>
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <Rise delay={440} ready={ready}>
              trend
            </Rise>
            <Rise delay={560} ready={ready}>
              <ClutchCardSm />
            </Rise>
          </div>
        </div>

        {/* Headline: 768–1023 */}
        <div className="hidden text-[72px] leading-[1.111] font-medium uppercase text-brand-dark tab:block lg:hidden">
          <div className="flex flex-wrap items-center gap-4">
            <Rise delay={80} ready={ready}>
              We
            </Rise>
            <Rise
              delay={200}
              ready={ready}
              className="bg-[url('/brand/accent-union-lg.svg')] bg-[length:100%_100%] bg-no-repeat px-3 py-2 text-brand-blue"
            >
              create
            </Rise>
            <Rise delay={320} ready={ready}>
              digital
            </Rise>
          </div>
          <div className="mt-2">
            <Rise delay={440} ready={ready}>
              solutions that
            </Rise>
          </div>
          <div className="mt-2 flex items-center gap-5">
            <Rise delay={560} ready={ready}>
              set the trend
            </Rise>
            <Rise delay={680} ready={ready}>
              <ClutchCardLg />
            </Rise>
          </div>
        </div>

        {/* Headline: 1024–1279 */}
        <div className="hidden text-[86px] leading-[1.093] font-medium uppercase text-brand-dark lg:block xl:hidden">
          <div className="flex flex-wrap items-center gap-4">
            <Rise delay={80} ready={ready}>
              We
            </Rise>
            <Rise
              delay={200}
              ready={ready}
              className="inline-flex h-24 w-[356px] items-center bg-[url('/brand/accent-union-xl.svg')] bg-[length:100%_100%] bg-no-repeat px-[11px] text-brand-blue"
            >
              create
            </Rise>
            <Rise delay={320} ready={ready}>
              digital
            </Rise>
          </div>
          <div className="mt-2">
            <Rise delay={440} ready={ready}>
              solutions that set
            </Rise>
          </div>
          <div className="mt-2 flex items-center gap-5">
            <Rise delay={560} ready={ready}>
              the trend
            </Rise>
            <Rise delay={680} ready={ready}>
              <ClutchCardLg />
            </Rise>
          </div>
        </div>

        {/* Headline: 1280+ */}
        <div className="hidden text-[86px] leading-[1.093] font-medium uppercase text-brand-dark xl:block">
          <div className="flex flex-wrap items-center gap-4">
            <Rise delay={80} ready={ready}>
              We
            </Rise>
            <Rise
              delay={200}
              ready={ready}
              className="inline-flex h-24 w-[356px] items-center bg-[url('/brand/accent-union-xl.svg')] bg-[length:100%_100%] bg-no-repeat px-[11px] text-brand-blue"
            >
              create
            </Rise>
            <Rise delay={320} ready={ready}>
              digital solutions
            </Rise>
          </div>
          <div className="mt-2 flex items-center gap-5">
            <Rise delay={440} ready={ready}>
              that set the trend
            </Rise>
            <Rise delay={560} ready={ready}>
              <ClutchCardLg />
            </Rise>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] w-full overflow-hidden rounded-[32px] bg-brand-light-blue/30 md:h-[572px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/video-placeholder.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-full max-w-none -translate-x-1/2 md:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/video-placeholder-wide.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 hidden h-full max-w-none -translate-x-1/2 md:block"
        />

        <a
          href="#"
          aria-label="Get in touch"
          className="absolute right-1/2 bottom-4 flex h-20 w-[358px] translate-x-1/2 items-center gap-3 bg-[url('/brand/cta-bg.svg')] bg-[length:100%_100%] bg-no-repeat px-5 py-3.5 md:hidden"
        >
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="text-base leading-[1.375] font-semibold text-white">Get in touch</span>
            <span className="text-[12px] leading-[1.17] font-normal text-white/50">Write In Our Telegram</span>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/arrow-up-right-circle.svg" alt="" aria-hidden width={42} height={42} className="shrink-0" />
        </a>
      </div>
    </section>
  );
}
