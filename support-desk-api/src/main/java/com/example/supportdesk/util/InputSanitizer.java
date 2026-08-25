package com.example.supportdesk.util;

public final class InputSanitizer {

    private InputSanitizer() {
    }

    /**
     * Trims leading/trailing spaces and converts an empty result to null.
     */
    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    /**
     * Removes control characters (e.g. stray tabs, newlines pasted into a
     * single-line field) from otherwise normal text.
     */
    public static String removeControlCharacters(String value) {
        if (value == null) {
            return null;
        }

        return value.replaceAll("\\p{Cntrl}", "");
    }

    /**
     * Combines trimming and control-character removal for simple free-text
     * fields such as a ticket title or description.
     */
    public static String sanitizeText(String value) {
        String trimmed = trimToNull(value);

        if (trimmed == null) {
            return null;
        }

        return removeControlCharacters(trimmed);
    }

    /**
     * Normalises code-like fields (e.g. category codes) to a consistent
     * shape: uppercase, no stray whitespace, spaces collapsed to underscores.
     * This does not decide whether the value is a valid category - that is
     * still validation's job.
     */
    public static String normalizeCode(String value) {
        String sanitized = sanitizeText(value);

        if (sanitized == null) {
            return null;
        }

        return sanitized.toUpperCase().replaceAll("\\s+", "_");
    }
}