import Image from 'next/image';

export function Header() {
  return (
    <header className="px-4 py-3 tab:px-6 lg:px-8 xl:py-5">
      {/* Mobile (< 768) */}
      <div className="flex h-[70px] w-full items-center justify-between bg-[url('/brand/header-bg.svg')] bg-[length:100%_100%] bg-no-repeat px-5 md:bg-[url('/brand/header-bg-md.svg')] tab:hidden">
        <Image src="/brand/logo.svg" alt="VB12" width={74} height={32} priority className="h-8 w-[74px]" />
        <button type="button" className="flex items-center gap-1 py-1.5 text-base font-semibold text-white">
          Eng
          <Image src="/brand/angle-left-small.svg" alt="" width={24} height={24} aria-hidden />
        </button>
        <button type="button" className="flex items-center gap-2 py-0.5 text-sm font-semibold text-white">
          Menu
          <Image src="/brand/menu.svg" alt="" width={24} height={24} aria-hidden />
        </button>
      </div>

      {/* Desktop (≥ 768) */}
      <div className="mx-auto hidden items-center justify-between gap-4 tab:flex 2xl:max-w-[1448px]">
        {/* Logo pill */}
        <div className="flex h-[70px] w-[208px] shrink-0 items-center gap-[23px] bg-[url('/brand/header-logo-bg-lg.svg')] bg-[length:100%_100%] bg-no-repeat pl-[18px] xl:h-20 xl:w-[225px] xl:gap-7 xl:bg-[url('/brand/header-logo-bg-xl.svg')] xl:pl-[22px]">
          <Image src="/brand/logo.svg" alt="VB12" width={74} height={32} priority className="h-8 w-[74px]" />
          <button
            type="button"
            className="flex items-center gap-2 py-0.5 text-base font-semibold text-white xl:gap-3 xl:py-1.5"
          >
            Menu
            <Image src="/brand/menu.svg" alt="" width={24} height={24} aria-hidden />
          </button>
        </div>

        {/* Cases (≥ 1280) */}
        <div className="relative hidden h-20 w-[212px] shrink-0 items-center xl:flex">
          <Image
            src="/brand/cases-bg.svg"
            alt=""
            aria-hidden
            fill
            sizes="212px"
            className="pointer-events-none !h-full !w-full"
          />
          <div className="relative flex items-center gap-[10px] pl-[22px]">
            <span className="w-12 text-base leading-[1.375] font-normal text-brand-dark">Cases</span>
            <div className="flex items-center -space-x-2.5">
              <span
                className="block h-[30px] w-[30px] rounded-full border border-white bg-brand-blue bg-cover bg-center"
                style={{ backgroundImage: "url('/brand/case-1.png')" }}
              />
              <span
                className="block h-[30px] w-[30px] rounded-full border border-white bg-cover bg-center"
                style={{ backgroundImage: "url('/brand/case-2.png')" }}
              />
              <span
                className="block h-[30px] w-[30px] rounded-full border border-white bg-cover bg-center"
                style={{ backgroundImage: "url('/brand/case-3.png')" }}
              />
              <span
                className="block h-[30px] w-[30px] rounded-full border border-white bg-cover bg-center"
                style={{ backgroundImage: "url('/brand/case-4.png')" }}
              />
              <span className="flex h-[30px] min-w-[30px] items-center justify-center rounded-full border border-brand-light-blue bg-white px-1 text-base leading-none font-semibold text-brand-dark">
                6+
              </span>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <Image src="/brand/social-media.svg" alt="" aria-hidden width={140} height={36} className="shrink-0" />

        {/* Phone (≥ 1024) */}
        <a
          href="tel:+380960001212"
          className="hidden shrink-0 items-center gap-3 py-1.5 text-base font-semibold text-brand-dark lg:flex"
        >
          <Image src="/brand/phone-call.svg" alt="" aria-hidden width={24} height={24} />
          (096) 000-12-12
        </a>

        {/* Language */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 py-1.5 text-base font-semibold text-brand-dark"
        >
          Eng
          <Image src="/brand/angle-left-small-dark.svg" alt="" width={24} height={24} aria-hidden />
        </button>

        {/* CTA */}
        <a
          href="#"
          className="flex h-[70px] w-[208px] shrink-0 items-center gap-2 bg-[url('/brand/cta-bg-lg.svg')] bg-[length:100%_100%] bg-no-repeat px-[14px] py-[14px] xl:h-20 xl:w-[225px] xl:gap-3 xl:bg-[url('/brand/cta-bg-xl.svg')]"
        >
          <span className="flex-1 text-center text-base font-semibold text-white">Get in touch</span>
          <Image
            src="/brand/arrow-up-right-circle.svg"
            alt=""
            aria-hidden
            width={42}
            height={42}
            className="shrink-0 xl:hidden"
          />
          <Image
            src="/brand/arrow-up-right-circle-lg.svg"
            alt=""
            aria-hidden
            width={52}
            height={52}
            className="hidden shrink-0 xl:block"
          />
        </a>
      </div>
    </header>
  );
}
