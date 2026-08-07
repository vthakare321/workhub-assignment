import { Link } from "react-router-dom";

import type { PageHeaderProps } from "./PageHeader.types";

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  rightContent
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center text-sm text-gray-500"
          >
            {breadcrumbs.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="flex items-center"
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2">/</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>

      {rightContent && (
        <div className="flex items-center gap-2">
          {rightContent}
        </div>
      )}
    </div>
  );
}