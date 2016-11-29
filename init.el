;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.
(when (>= emacs-major-version 24)
    (require 'package)
    (package-initialize)
    (add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/") t))

;; cl - Common Lisp Extension
(require 'cl)

;; Add Packages
(defvar my/packages '(
	       ;; --- Auto-completion ---
	       company
	       ;; --- Better Editor ---
	       hungry-delete
	       ;swiper
	       ;counsel
	       ;smartparens
	       ;; --- Major Mode ---
	       ;js2-mode
	       ;; --- Minor Mode ---
	       ;nodejs-repl
	       ;exec-path-from-shell
	       ;; --- Themes ---
	       monokai-theme
	       solarized-theme
	       ) "Default packages")

(setq package-selected-packages my/packages)

(defun my/packages-installed-p ()
    (loop for pkg in my/packages
	  when (not (package-installed-p pkg)) do (return nil)
	  finally (return t)))

(unless (my/packages-installed-p)
    (message "%s" "Refreshing package database...")
    (package-refresh-contents)
    (dolist (pkg my/packages)
      (when (not (package-installed-p pkg))
	(package-install pkg))))





(tool-bar-mode -1)
(global-linum-mode t)


(defun op()
  (interactive)
  (find-file "~/.emacs.d/init.el") )

(global-set-key (kbd "<f2>") 'op)

(global-company-mode t)

(delete-selection-mode t)

(setq-default cursor-type 'bar)

(setq inhibit-splash-screen 1)
(setq make-backup-files nil)

(require 'hungry-delete)
(global-hungry-delete-mode)


(require 'recentf)
(recentf-mode 1)
(setq recentf-max-menu-item 10)
(global-hl-line-mode 1)

(load-theme 'monokai 1)

