/*
 * **********************************************
 * Printing result depth
 *
 * You can enlarge it, if needed.
 * **********************************************
 */
maximum_printing_depth(100).

:- current_prolog_flag(toplevel_print_options, A),
   (select(max_depth(_), A, B), ! ; A = B),
   maximum_printing_depth(MPD),
   set_prolog_flag(toplevel_print_options, [max_depth(MPD)|B]).



% Signature: sub_list(Sublist, List)/2
% Purpose: All elements in Sublist appear in List in the same order.
% Precondition: List is fully instantiated (queries do not include variables in their second argument).

sub_list([], _).
sub_list(Sublist, [_|T]) :- sub_list(Sublist, T).
sub_list([S|T1], [S|T2]) :- sub_list(T1, T2).



% Signature: sub_tree(Subtree, Tree)/2
% Purpose: Tree contains Subtree.

sub_tree(Tree, Tree).
sub_tree(Subtree, tree(_, Left, _)) :- sub_tree(Subtree, Left).
sub_tree(Subtree, tree(_, _, Right)) :- sub_tree(Subtree, Right).



% Signature: swap_tree(Tree, InversedTree)/2
% Purpose: InversedTree is the �mirror� representation of Tree.

swap_tree(void, void).
swap_tree(tree(Root, Left, Right), tree(Root, InvLeft, InvRight)) :-
    swap_tree(Left, InvLeft),
    swap_tree(Right, InvRight).


