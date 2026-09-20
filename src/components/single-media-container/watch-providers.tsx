import Image from "next/image";
import React from "react";

import { WatchProviderEntity, WatchProvidersResponse } from "@/types";
import { DEFAULT_REGION, tmdbImage } from "@/utils";

interface ProviderRowProps {
  label: string;
  providers?: WatchProviderEntity[];
  link: string;
}

const ProviderRow = ({ label, providers, link }: ProviderRowProps) => {
  if (!providers?.length) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 text-sm text-white/50">{label}</span>
      <div className="flex flex-wrap gap-2">
        {providers.map((provider) => {
          const src = tmdbImage(provider.logo_path, "w200");
          if (!src) return null;
          return (
            <a
              key={provider.provider_id}
              href={link}
              target="_blank"
              rel="noreferrer"
              title={provider.provider_name}
              className="rounded-lg transition hover:ring-2 hover:ring-primary"
            >
              <Image
                src={src}
                alt={provider.provider_name}
                width={36}
                height={36}
                className="rounded-lg"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

interface WatchProvidersProps {
  data?: WatchProvidersResponse;
}

const WatchProviders = ({ data }: WatchProvidersProps) => {
  const region = data?.results[DEFAULT_REGION];
  if (!region) return null;

  return (
    <div className="mt-6 space-y-2">
      <h2 className="mb-2 text-base font-bold text-white">Where to watch</h2>
      <ProviderRow
        label="Stream"
        providers={region.flatrate}
        link={region.link}
      />
      <ProviderRow label="Rent" providers={region.rent} link={region.link} />
      <ProviderRow label="Buy" providers={region.buy} link={region.link} />
      <a
        href={region.link}
        target="_blank"
        rel="noreferrer"
        className="inline-block pt-1 text-xs text-white/40 underline"
      >
        Data provided by JustWatch
      </a>
    </div>
  );
};

export default WatchProviders;
