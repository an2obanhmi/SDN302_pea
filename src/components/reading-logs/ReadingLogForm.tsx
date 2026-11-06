"use client";

import React, { useState } from "react";
import { useReadingLog } from "@/context/ReadingLogContext";
import { GENRES } from "@/constants/genres";
import { MESSAGES } from "@/constants/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReadingLogForm() {
  const { addReadingLog } = useReadingLog();

  const [bookTitle, setBookTitle] = useState("");
  const [minutesRead, setMinutesRead] = useState("");
  const [genre, setGenre] = useState("");
  const [note, setNote] = useState("");
  const [readOn, setReadOn] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [readingLogError, setReadingLogError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getBookTitleError = (val: string) => {
    if (!val.trim()) return MESSAGES.BOOK_TITLE_REQUIRED;
    if (val.length > 80) return MESSAGES.BOOK_TITLE_MAX_LENGTH;
    return "";
  };

  const getMinutesError = (val: string) => {
    if (!val || val.trim() === "" || isNaN(Number(val))) return MESSAGES.MINUTES_REQUIRED;
    if (Number(val) <= 0) return MESSAGES.MINUTES_POSITIVE;
    return "";
  };

  const getGenreError = (val: string) => {
    if (!val || val === "Choose genre") return MESSAGES.GENRE_REQUIRED;
    if (!GENRES.includes(val as any)) return MESSAGES.GENRE_INVALID;
    return "";
  };

  const getDateError = (val: string) => {
    if (!val || !val.trim()) return MESSAGES.DATE_REQUIRED;
    const todayStr = new Date().toISOString().split("T")[0];
    if (val > todayStr) return MESSAGES.DATE_FUTURE;
    return "";
  };

  const bookTitleError = hasSubmitted ? getBookTitleError(bookTitle) : "";
  const minutesError = hasSubmitted ? getMinutesError(minutesRead) : "";
  const genreError = hasSubmitted ? getGenreError(genre) : "";
  const dateError = hasSubmitted ? getDateError(readOn) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setReadingLogError("");
    setSuccessMessage("");

    const errTitle = getBookTitleError(bookTitle);
    const errMins = getMinutesError(minutesRead);
    const errGenre = getGenreError(genre);
    const errDate = getDateError(readOn);

    if (errTitle || errMins || errGenre || errDate) {
      return;
    }

    const res = await addReadingLog({
      bookTitle: bookTitle.trim(),
      minutesRead: parseInt(minutesRead, 10),
      genre,
      note: note.trim(),
      readOn,
    });

    if (!res.success) {
      setReadingLogError(res.error || "Failed to add reading session");
    } else {
      setSuccessMessage(MESSAGES.READING_LOG_ADDED);
      setBookTitle("");
      setMinutesRead("");
      setGenre("");
      setNote("");
      setReadOn("");
      setHasSubmitted(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Add Reading Session</CardTitle>
      </CardHeader>
      <CardContent>
        <form data-testid="reading-log-form" noValidate onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div data-testid="reading-log-success" className="text-sm font-medium text-green-600">
              {successMessage}
            </div>
          )}
          {readingLogError && (
            <div data-testid="error-reading-log" className="text-sm font-medium text-destructive">
              {readingLogError}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="input-book-title">Book Title</Label>
            <Input
              id="input-book-title"
              data-testid="input-book-title"
              value={bookTitle}
              onChange={(e) => {
                setBookTitle(e.target.value);
                setReadingLogError("");
              }}
              placeholder="e.g. Atomic Habits"
            />
            {bookTitleError && (
              <span data-testid="error-book-title" className="text-sm text-destructive block">
                {bookTitleError}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="input-minutes">Minutes Read</Label>
              <Input
                id="input-minutes"
                data-testid="input-minutes"
                type="number"
                step="1"
                value={minutesRead}
                onChange={(e) => {
                  setMinutesRead(e.target.value);
                  setReadingLogError("");
                }}
                placeholder="40"
              />
              {minutesError && (
                <span data-testid="error-minutes" className="text-sm text-destructive block">
                  {minutesError}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="input-genre">Genre</Label>
              <Select
                id="input-genre"
                data-testid="input-genre"
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                  setReadingLogError("");
                }}
              >
                <option value="">Choose genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
              {genreError && (
                <span data-testid="error-genre" className="text-sm text-destructive block">
                  {genreError}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="input-date">Date</Label>
              <Input
                id="input-date"
                data-testid="input-date"
                type="date"
                value={readOn}
                onChange={(e) => {
                  setReadOn(e.target.value);
                  setReadingLogError("");
                }}
              />
              {dateError && (
                <span data-testid="error-date" className="text-sm text-destructive block">
                  {dateError}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="input-note">Note (Optional)</Label>
              <Input
                id="input-note"
                data-testid="input-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Chapter 3"
              />
            </div>
          </div>

          <Button type="submit" data-testid="btn-add-reading-log" className="w-full">
            Add Reading Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
