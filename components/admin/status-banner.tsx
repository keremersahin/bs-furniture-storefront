type StatusBannerProps = {
  status?: string;
  error?: string;
};

const statusMessages: Record<string, string> = {
  created: "Urun basariyla eklendi.",
  updated: "Urun basariyla guncellendi.",
  deleted: "Urun basariyla silindi."
};

export function StatusBanner({ status, error }: StatusBannerProps) {
  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        {decodeURIComponent(error)}
      </div>
    );
  }

  if (status && statusMessages[status]) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
        {statusMessages[status]}
      </div>
    );
  }

  return null;
}
